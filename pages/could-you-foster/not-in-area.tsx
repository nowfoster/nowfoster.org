import { GetStaticProps } from "next"
import { CentredQuestion, QuizFooter } from "../../components/QuizLayout"
import { getQuizContent } from "../../lib/cms"
import Link from "next/link"

const CheckPostcode = () => {
  return (
    <>
      <CentredQuestion>
        <div>
          <h1>Sorry, we&apos;re hoping to be in your area soon</h1>
          <p>
            We don&apos;t always get it right, if you think your postcode is
            within an hour&apos;s commute to Newham please email us at{" "}
            <strong>introchat@nowfoster.org</strong>.
          </p>
          <br/><br/>
          <h2>Want to stay in touch?</h2>
          <p>
            Stay up to date with our new areas, events and news by joining our mailing list.
          </p>
          <div className="optionList">
            <Link
                href="https://tinyletter.com/NowFoster"
                className="squaredButton"
              >
              Join our mailing list to stay in touch
            </Link>
          </div>
        </div>
      </CentredQuestion>
      <QuizFooter goBack="/could-you-foster/check-answers">
        <></>
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
