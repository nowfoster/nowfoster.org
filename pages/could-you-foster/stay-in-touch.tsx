import { GetStaticProps } from "next"
import { Icon } from "../../components/LoaderButton"
import {
  CentredQuestion,
  QuizFooter,
} from "../../components/QuizLayout"
import { getQuizContent } from "../../lib/cms"
import Link from "next/link"
import s from "./stay-in-touch.module.scss"

const CheckPostcode = () => {
  return (
    <>
    <CentredQuestion>
      <div>
        <h1>It’s normal to have doubts. Your time will come."</h1>
        <p>"Please choose how you want to stay in touch.</p>
          <div className={s.optionList}>
            <Link href="." className="squaredButton">Join our mailing list to stay in touch</Link>
            <Link href="." className="squaredButton">Invite me to the next info event</Link>
            <Link href="." className="squaredButton">Chat to a foster carer</Link>
          </div>
      </div>
    </CentredQuestion>
    <QuizFooter goBack="/could-you-foster/check-answers">
    </QuizFooter>
  </>
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
