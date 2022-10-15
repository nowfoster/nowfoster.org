import type { NextApiRequest } from "next"
import { Icon } from "../components/Button"
import QuizDialog from "../components/QuizDialog"
import QuizFooter from "../components/QuizFooter"
import { getFosteringOptions, getQuizContent } from "../lib/cms"
import { FosteringOption, Quiz } from "../types"

interface Props {
  quiz: Quiz
  fosteringOptions: FosteringOption[]
}

const Home = ({ quiz, fosteringOptions }: Props) => (
  <>
    <section className="hero">
      <div className="container hero__inner">
        <h1 className="hero__headline">The fostering service with heart</h1>
        <a href="#" className="hero__button">
          Learn about us <Icon />
        </a>
      </div>
    </section>

    <section className="options">
      <div className="container">
        <h2 className="options__headline">Kinds of fostering</h2>

        <div className="options-list">
          {fosteringOptions.map(option => (
            <article key={option.id} className="options-list__option">
              <h3 className="options-list__option-title">{option.title}</h3>
              <p>{option.description}</p>
              <p className="options-list__option-last-para">
                {option.conclusion}
              </p>
            </article>
          ))}
        </div>

        <a className="options__button" href="#">
          Learn more
          <Icon />
        </a>
      </div>
    </section>

    <div className="container">
      <p>Forget everything you think you know about fostering.</p>
      <p>
        We’re a not-for-profit start-up building a brand new way of doing things
        that empowers brilliant people to care for children and young people.
      </p>
      <p>
        There are a lot of myths around fostering. Explore what it really takes
        to be a great foster carer.
      </p>

      <QuizDialog quiz={quiz} />

      <QuizFooter quiz={quiz} />
    </div>
  </>
)

export default Home

export const getStaticProps = async ({ preview }: NextApiRequest) => {
  const quiz = await getQuizContent({ preview: !!preview })
  const fosteringOptions = await getFosteringOptions({ preview: !!preview })

  return {
    props: {
      quiz,
      fosteringOptions,
      showPreviewBanner: !!preview,
    },
  }
}
