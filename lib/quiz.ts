import { Answers, Option, Question, Quiz, QuizSection } from "../types"

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
          Object.entries(sectionAnswers).map(([questionId, optionId]) => {
            const question: Question | undefined = section?.questions.find(
              question => question.id === questionId
            )
            const option: Option | undefined = question?.options.find(
              option => option.id === optionId
            )
            return [question?.question, option?.optionText]
          })
        ),
      ]
    })
  )
