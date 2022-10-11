import type { NextApiRequest } from "next"
import QuizDialog from "../components/QuizDialog"
import QuizFooter from "../components/QuizFooter"
import { getQuizContent } from "../lib/cms"
import { Quiz } from "../types"

interface Props {
  quiz: Quiz
}

const Home = ({ quiz }: Props) => (
  <>
    <h1>The fostering service with heart</h1>
    <p>Forget everything you think you know about fostering.</p>
    <p>
      We’re a not-for-profit start-up building a brand new way of doing things
      that empowers brilliant people to care for children and young people.
    </p>
    <a href="#">Learn about us</a>

    <p>
      There are a lot of myths around fostering. Explore what it really takes to
      be a great foster carer.
    </p>

    <QuizDialog quiz={quiz} />

    <h2>Fostering stories</h2>

    <h2>Your fostering options</h2>
    <a href="#">See all options</a>

    <h2>Why foster?</h2>

    <QuizFooter quiz={quiz} />
  </>
)

export default Home

export const getStaticProps = async ({ preview }: NextApiRequest) => {
  const quiz = await getQuizContent({ preview: !!preview })

  return {
    props: {
      quiz,
      showPreviewBanner: !!preview,
    },
  }
}
