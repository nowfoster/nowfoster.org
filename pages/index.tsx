import type { NextPage, NextPageContext } from "next"
import QuizDialog from "../components/QuizDialog"
import { getQuizContent } from "../lib/cms"
import { Quiz } from "../types"

const Home: NextPage<Quiz> = quiz => (
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
  </>
)

export default Home

export const getStaticProps = async (context: NextPageContext) => {
  const quiz = await getQuizContent()

  return {
    props: quiz,
  }
}
