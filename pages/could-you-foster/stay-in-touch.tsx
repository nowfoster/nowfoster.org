import { GetStaticProps } from "next"
import {
  CentredQuestion,
  QuizFooter,
} from "../../components/QuizLayout"
import { getQuizContent } from "../../lib/cms"
import Link from "next/link"

const StayInTouch = () => {
  return (
    <>
    <CentredQuestion>
      <div>
        <h1 >It&apos;s normal to have doubts. Your time will come.</h1>
        <p>Please choose how you want to stay in touch.</p>
          <div className="optionList">
            <Link href="mailto:introchat@nowfoster.org?subject=Chat to a foster carer" className="squaredButton">Chat to a foster carer</Link>
            <Link href="https://tinyletter.com/NowFoster" className="squaredButton">Join our mailing list to stay in touch</Link>
            <Link href="mailto:introchat@nowfoster.org?subject=Invite me to the next info event" className="squaredButton">Invite me to the next info event</Link>
          </div>
      </div>
    </CentredQuestion>
    <QuizFooter goBack="/could-you-foster/check-answers">
    </QuizFooter>
  </>
  )
}

export default StayInTouch

export const getStaticProps: GetStaticProps = async ({ preview }) => {
  const quiz = await getQuizContent({ preview: !!preview })

  return {
    props: {
      quiz,
      showPreviewBanner: !!preview,
    },
  }
}
