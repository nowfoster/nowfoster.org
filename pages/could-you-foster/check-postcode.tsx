import { yupResolver } from "@hookform/resolvers/yup"
import { GetStaticProps } from "next"
import { useRouter } from "next/router"
import { FormProvider, useForm } from "react-hook-form"
import Field from "../../components/Field"
import { Icon } from "../../components/LoaderButton"
import {
  CentredQuestion,
  QuizFooter,
  QuizForm,
} from "../../components/QuizLayout"
import { useQuiz } from "../../contexts/quiz"
import { getQuizContent } from "../../lib/cms"
import { postcodeSchema } from "../../lib/validators"
import { Quiz as IQuiz } from "../../types"
import { allowedPrefixes } from "../../config"
import { event } from "nextjs-google-analytics"

interface Props {
  quiz: IQuiz
}

interface FormAnswers {
  postcode: string
}

const CheckPostcode = ({ quiz }: Props) => {
  const { quizAnswers } = useQuiz()
  const { push } = useRouter()

  const methods = useForm<FormAnswers>({
    resolver: yupResolver(postcodeSchema),
  })

  const onSubmit = (values: FormAnswers) => {
    event("readiness_checker", {
      category: "Check",
      label: values.postcode,
    })

    if (
      !!allowedPrefixes.find(prefix =>
        values.postcode?.toLowerCase().startsWith(prefix.toLowerCase())
      )
    ) {
      push("/apply")
    } else {
      push("/could-you-foster/not-in-area")
    }
  }

  return (
    <FormProvider {...methods}>
      <QuizForm onSubmit={methods.handleSubmit(onSubmit)}>
        <CentredQuestion>
          <Field
            big
            label="What is your postcode?"
            hint="So we can direct you to the right person to talk to"
            name="postcode"
          />
        </CentredQuestion>

        <QuizFooter goBack="/could-you-foster/check-answers">
          <button className="button">
            Continue <Icon />
          </button>
        </QuizFooter>
      </QuizForm>
    </FormProvider>
  )
}

export default CheckPostcode

export const getStaticProps: GetStaticProps = async ({ preview }) => {
  const quiz = await getQuizContent({ preview: !!preview })

  return {
    props: {
      quiz,
      showPreviewBanner: !!preview,
    },
  }
}
