import * as contentful from "contentful"
import { create } from "domain"
import { FosteringOption, FosteringStory, Quiz } from "../types"
import {
  IFosteringOptionFields,
  IFosteringStoriesFields,
  IPage,
  IPageFields,
  IQuizSectionFields,
} from "../types/generated/contentful"

interface Opts {
  preview: boolean
}

const createClient = (preview?: boolean) =>
  contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    // get draft content if this is a preview
    accessToken: preview
      ? (process.env.CONTENTFUL_PREVIEW_TOKEN as string)
      : (process.env.CONTENTFUL_ACCESS_TOKEN as string),
    host: preview ? "preview.contentful.com" : undefined,
  })

export const getPageContentBySlug = async (
  slug: string,
  opts?: Opts
): Promise<contentful.Entry<IPageFields> | null> => {
  const client = createClient(opts?.preview)

  const data = await client.getEntries<IPageFields>({
    content_type: "page",
    "fields.slug[in]": slug,
  })

  return data.items[0] || null
}

export const getQuizContent = async (opts?: Opts): Promise<Quiz> => {
  const client = createClient(opts?.preview)

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
          options: question.fields.options.map(option => ({
            id: option.sys.id,
            ...option.fields,
          })),
        })) || [],
    })),
  }
}

export const getFosteringOptions = async (
  opts?: Opts
): Promise<FosteringOption[]> => {
  const client = createClient(opts?.preview)

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

export const getFosteringStories = async (
  opts?: Opts
): Promise<FosteringStory[]> => {
  const client = createClient(opts?.preview)

  const data = await client.getEntries<IFosteringStoriesFields>({
    include: 2,
    content_type: "fosteringStories",
    order: "sys.createdAt", // oldest first
  })

  return data.items.map(item => ({
    id: item.sys.id,
    ...item.fields,
  }))
}
