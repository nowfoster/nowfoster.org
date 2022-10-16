import * as contentful from "contentful"
import { FosteringOption, Quiz } from "../types"
import {
  IFosteringOption,
  IFosteringOptionFields,
  IQuizSectionFields,
} from "../types/generated/contentful"

interface Opts {
  preview: boolean
}

export const getQuizContent = async (opts?: Opts): Promise<Quiz> => {
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    // get draft content if this is a preview
    accessToken: opts?.preview
      ? (process.env.CONTENTFUL_PREVIEW_TOKEN as string)
      : (process.env.CONTENTFUL_ACCESS_TOKEN as string),
    host: opts?.preview ? "preview.contentful.com" : undefined,
  })

  const data = await client.getEntries<IQuizSectionFields>({
    include: 2,
    content_type: "quizSection",
  })

  return {
    sections: data.items.map(item => ({
      id: item.sys.id,
      ...item.fields,
      questions:
        item.fields?.questions?.map(question => ({
          id: question.sys.id,
          ...question.fields,
          suggestion: question.fields.suggestion && {
            id: question.fields.suggestion.sys.id,

            ...question.fields.suggestion?.fields,
          },
        })) || [],
    })),
  }
}

export const getFosteringOptions = async (
  opts?: Opts
): Promise<FosteringOption[]> => {
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    // get draft content if this is a preview
    accessToken: opts?.preview
      ? (process.env.CONTENTFUL_PREVIEW_TOKEN as string)
      : (process.env.CONTENTFUL_ACCESS_TOKEN as string),
    host: opts?.preview ? "preview.contentful.com" : undefined,
  })

  const data = await client.getEntries<IFosteringOptionFields>({
    include: 2,
    content_type: "fosteringOption",
    order: "sys.createdAt", // oldest first
  })

  return data.items.map(item => ({
    id: item.sys.id,
    ...item.fields,
  }))
}
