import { GetStaticProps } from "next"
import {
  CentredQuestion,
  QuizFooter,
} from "../../components/QuizLayout"
import { getQuizContent } from "../../lib/cms"
import Link from "next/link"

const CheckPostcode = () => {
  return (
    <>
    <CentredQuestion>
      <div>
        <h1>Sorry, we're hoping to be in your area soon</h1>
        <p>xxx</p>
          <div className="optionList">
            <Link href="https://www.thefosteringnetwork.org.uk/providers" className="squaredButton">Find a local fostering service</Link>
            <Link href="." className="squaredButton">Join our mailing list to stay in touch</Link>
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
