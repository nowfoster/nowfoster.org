import { zodResolver } from "@hookform/resolvers/zod"
import { GetStaticProps, NextPageContext } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { Icon } from "../../../components/LoaderButton"
import Question from "../../../components/Question"
import {
  CentredQuestion,
  QuizFooter,
  QuizForm,
  QuizMain,
} from "../../../components/QuizLayout"
import Suggestion from "../../../components/Suggestion"
import { useQuiz } from "../../../contexts/quiz"
import { getQuizContent } from "../../../lib/cms"
import {
  generateInitialAnswer,
  generateInitialAnswers,
} from "../../../lib/quiz"
import { generateQuestionSchema } from "../../../lib/validators"
import {
  Question as IQuestion,
  QuizSection,
  SectionAnswers,
  Suggestion as ISuggestion,
} from "../../../types"

interface Props {
  question: IQuestion
  section: QuizSection
  questionIndex: number
  sectionIndex: number
}

const QuestionPage = ({
  question,
  section,
  questionIndex,
  sectionIndex,
}: Props) => {
  const { answerQuestion, quizAnswers } = useQuiz()

  const savedAnswer = quizAnswers?.[section.title]?.[question.question]
  const selectedOption = question.options.find(
    option => option.optionText === savedAnswer
  )

  const [suggestion, setSuggestion] = useState<ISuggestion | null | undefined>(
    selectedOption
  )
  const { push } = useRouter()

  const methods = useForm<SectionAnswers>({
    resolver: zodResolver(generateQuestionSchema(question)),
    defaultValues: {
      [question.question]: savedAnswer || generateInitialAnswer(question),
    },
  })

  const isFirstQuestion = questionIndex === 0
  const isLastQuestion = section.questions.length - 1 === questionIndex

  const onSubmit = (answers: SectionAnswers) => {
    if (question.questionType !== "explorer")
      answerQuestion(section.title, answers)
    push(
      isLastQuestion
        ? "/could-you-foster"
        : `/could-you-foster/${sectionIndex}/${questionIndex + 1}`
    )
  }

  let goBackLink = isFirstQuestion
    ? `/could-you-foster/${sectionIndex}`
    : `/could-you-foster/${sectionIndex}/${questionIndex - 1}`

  return (
    <FormProvider {...methods}>
      <QuizForm onSubmit={methods.handleSubmit(onSubmit)}>
        {question.questionType === "checkbox" ? (
          <CentredQuestion>
            <Question question={question} setSuggestion={setSuggestion} />
          </CentredQuestion>
        ) : (
          <QuizMain>
            <Question question={question} setSuggestion={setSuggestion} />
            <Suggestion suggestion={suggestion} />
          </QuizMain>
        )}

        <QuizFooter goBack={goBackLink}>
          <button className="button">
            Continue <Icon />
          </button>
        </QuizFooter>
      </QuizForm>
    </FormProvider>
  )
}

export default QuestionPage

export const getServerSideProps: GetStaticProps = async ({
  preview,
  params,
}) => {
  const quiz = await getQuizContent({ preview: !!preview })

  const sectionIndex = parseInt(params?.sectionIndex as string)
  const section = quiz.sections?.[sectionIndex]
  const questionIndex = parseInt(params?.questionIndex as string)
  const question = section?.questions?.[questionIndex]

  if (!question) return { notFound: true }

  return {
    props: {
      quiz,
      section,
      question,
      showPreviewBanner: !!preview,
      sectionIndex,
      questionIndex,
    },
  }
}
