import type { GetServerSideProps, GetStaticProps, NextApiRequest } from "next"
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
        <h1 className="hero__headline">
          Forget everything you think you know about fostering
        </h1>
        <p className="hero__strap">
          Explore what it really takes to be a great foster carer{" "}
        </p>
        <a href="#" className="hero__button">
          Could you foster? <Icon />
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

    <section className="story">
      <div className="container">
        <p>Fostering with us</p>
        <p>
          Now Foster is a team of innovative social workers, designers and
          entrepreneurs who want to change how fostering is done.
        </p>
        <p>
          We work alongside innovative councils across the UK to find and
          empower brilliant people to care for children and young people.
        </p>
      </div>
    </section>
  </>
)

export default Home

export const getStaticProps: GetStaticProps = async ({ preview }) => {
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
