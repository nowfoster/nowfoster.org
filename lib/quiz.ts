import {
  Answer,
  Answers,
  Option,
  Question,
  Quiz,
  QuizSection,
  SectionAnswers,
} from "../types"

const getOptionById = (
  optionId: string,
  question?: Question
): string | void => {
  const option: Option | undefined = question?.options.find(
    option => option.id === optionId
  )
  return option?.optionText
}

// convert stored section, question and option ids to the real answers
export const decodeAnswers = (answers: Answers, quiz: Quiz): Answers =>
  Object.fromEntries(
    Object.entries(answers).map(([sectionId, sectionAnswers]) => {
      const section: QuizSection | undefined = quiz.sections.find(
        section => section.id === sectionId
      )
      return [
        section?.title,
        Object.fromEntries(
          Object.entries(sectionAnswers).map(
            ([questionId, optionOrOptions]) => {
              const question: Question | undefined = section?.questions.find(
                question => question.id === questionId
              )

              if (Array.isArray(optionOrOptions)) {
                const optionIds = optionOrOptions
                return [
                  question?.question,
                  optionIds.map(optionId => getOptionById(optionId, question)),
                ]
              } else {
                const optionId = optionOrOptions
                return [question?.question, getOptionById(optionId, question)]
              }
            }
          )
        ),
      ]
    })
  )

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
