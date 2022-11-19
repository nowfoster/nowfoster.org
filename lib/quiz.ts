import { Answer, Option, Question, SectionAnswers } from "../types"

const getOptionById = (
  optionId: string,
  question?: Question
): string | void => {
  const option: Option | undefined = question?.options.find(
    option => option.id === optionId
  )
  return option?.optionText
}

export const generateInitialAnswer = (question: Question): Answer => {
  if (question.questionType === "checkbox") return []
  if (question.questionType === "explorer")
    return question.options[0].optionText
  return ""
}

export const removeExplorerAnswers = (
  answers: SectionAnswers,
  questions: Question[]
): SectionAnswers =>
  Object.fromEntries(
    Object.entries(answers).filter(
      ([questionId]) =>
        questions.find(question => questionId === question.id)?.questionType !==
        "explorer"
    )
  )
