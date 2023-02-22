import { yupResolver } from "@hookform/resolvers/yup"
import { GetStaticProps } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
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
import { generateInitialAnswer } from "../../../lib/quiz"
import { generateQuestionSchema } from "../../../lib/validators"
import {
  Question as IQuestion,
  Quiz,
  QuizSection,
  SectionAnswers,
  Suggestion as ISuggestion,
} from "../../../types"

interface Props {
  quiz: Quiz
  question: IQuestion
  section: QuizSection
  questionIndex: number
  sectionIndex: number
}

const QuestionPage = ({
  quiz,
  question,
  section,
  questionIndex,
  sectionIndex,
}: Props) => {
  const { answerQuestion, quizAnswers } = useQuiz()

  const savedAnswer = quizAnswers?.[section.title]?.[question.question]

  const { push } = useRouter()

  const methods = useForm<SectionAnswers>({
    resolver: yupResolver(generateQuestionSchema(question)),
    defaultValues: {
      [question.question]: savedAnswer
        ? savedAnswer
        : generateInitialAnswer(question),
    },
  })

  // stop form state drifting out of sync
  useEffect(() => {
    methods.reset({
      [question.question]: savedAnswer
        ? savedAnswer
        : generateInitialAnswer(question),
    })
  }, [questionIndex, methods, question, savedAnswer])

  const selectedOption = question.options.find(
    option => option.optionText === methods.getValues(question.question)
  )

  const [suggestion, setSuggestion] = useState<ISuggestion | null | undefined>(
    selectedOption
  )

  const isFirstQuestion = questionIndex === 0
  const isLastQuestion = section.questions.length - 1 === questionIndex
  const isLastSection = quiz.sections.length - 1 === sectionIndex

  const onSubmit = (answers: SectionAnswers) => {
    if (question.questionType !== "explorer")
      answerQuestion(section.title, answers)
    push(
      isLastQuestion
        ? isLastSection
          ? `/could-you-foster/check-answers`
          : `/could-you-foster/${sectionIndex + 1}`
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
            <Suggestion
              suggestion={suggestion}
              key={methods.getValues(question.question) as string}
            />
          </QuizMain>
        )}

        <QuizFooter goBack={goBackLink}>
          <button className="quizButton">
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
