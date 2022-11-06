import { GetStaticProps } from "next"
import Link from "next/link"
import { Icon } from "../../components/LoaderButton"
import { QuizFooter, QuizMain } from "../../components/QuizLayout"
import { useQuiz } from "../../contexts/quiz"
import { getQuizContent } from "../../lib/cms"
import { Quiz as IQuiz } from "../../types"
import s from "./check-answers.module.scss"

interface Props {
  quiz: IQuiz
}

const CheckAnswers = ({ quiz }: Props) => {
  const { quizAnswers } = useQuiz()

  const lastSectionIndex = quiz.sections.length - 1
  const goBackLink = `/could-you-foster/${lastSectionIndex}/${
    quiz.sections?.[lastSectionIndex].questions.length - 1
  }`

  return (
    <>
      <QuizMain padded>
        <h2>Still with us?</h2>
        <p>
          Book a 30 minute intro chat to ask us anything about fostering. Just a
          chat over the phone, video call or text. At a time that suits you.
        </p>

        <h3>Your answers</h3>

        <div className={s.answers}>
          {Object.entries(quizAnswers).map(([sectionTitle, sectionAnswers]) => (
            <div key={sectionTitle}>
              <h4>{sectionTitle}</h4>
              <dl>
                {Object.entries(sectionAnswers).map(([question, answer]) => (
                  <div key={question}>
                    <dt>{question}</dt>
                    <dd>
                      {Array.isArray(answer) ? answer.join(", ") : answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </QuizMain>

      <QuizFooter goBack={goBackLink}>
        <Link href="/could-you-foster/check-postcode" className="button">
          Book an intro chat <Icon />
        </Link>
      </QuizFooter>
    </>
  )
}

export default CheckAnswers

export const getStaticProps: GetStaticProps = async ({ preview }) => {
  const quiz = await getQuizContent({ preview: !!preview })

  return {
    props: {
      quiz,
      showPreviewBanner: !!preview,
    },
  }
}
