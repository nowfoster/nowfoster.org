import * as contentful from "contentful"
import { Quiz } from "../types"
import { IQuizSectionFields } from "../types/generated/contentful"

export const getQuizContent = async (): Promise<Quiz> => {
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  })

  const data = await client.getEntries<IQuizSectionFields>({
    include: 2,
    content_type: "quizSection",
  })

  return {
    sections: data.items.map(item => ({
      id: item.sys.id,
      ...item.fields,
      questions: item.fields.questions.map(question => ({
        id: question.sys.id,
        ...question.fields,
        suggestion: question.fields.suggestion && {
          id: question.fields.suggestion.sys.id,
          ...question.fields.suggestion?.fields,
        },
      })),
    })),
  }
}
