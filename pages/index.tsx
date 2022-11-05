import type { GetStaticProps } from "next"
import { Icon } from "../components/Button"
import FosteringStory from "../components/FosteringStory"
import s from "./index.module.scss"

import { blogUrl } from "../config"
import {
  getFosteringOptions,
  getFosteringStories,
  getQuizContent,
} from "../lib/cms"
import {
  FosteringOption,
  FosteringStory as IFosteringStory,
  Quiz,
} from "../types"

interface Props {
  quiz: Quiz
  fosteringOptions: FosteringOption[]
  fosteringStories: IFosteringStory[]
}

const Home = ({ quiz, fosteringOptions, fosteringStories }: Props) => (
  <>
    <section className={s.hero}>
      <div className="container">
        <h1>Forget everything you think you know about fostering</h1>

        <p>Explore what it really takes to be a great foster carer </p>

        <a href="#">
          Could you foster? <Icon />
        </a>
      </div>
    </section>

    <section className={s.options}>
      <div className="container">
        <h2>Kinds of fostering</h2>

        <p>There&apos;s lots of choice and flexibility in fostering.</p>

        <div className={s.optionsList}>
          {fosteringOptions.map(option => (
            <article key={option.id}>
              <h3>{option.title}</h3>
              <p>{option.description}</p>
              <p>{option.conclusion}</p>
            </article>
          ))}
        </div>

        <a className="options__button" href="#">
          Could you foster?
          <Icon />
        </a>
      </div>
    </section>

    <section className="stories">
      <div className="container">
        <h2>Fostering stories</h2>
        <p>Join our community of foster carers</p>

        <div>
          {fosteringStories.map(story => (
            <FosteringStory {...story} key={story.id} />
          ))}
        </div>

        <a href={blogUrl}>
          Explore more stories
          <Icon />
        </a>
      </div>
    </section>

    <section className={s.story}>
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

        <a href="#">
          Learn more
          <Icon />
        </a>
      </div>
    </section>

    <section className={s.story}>
      <div className="container">
        <p>Why foster?</p>
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
  const fosteringStories = await getFosteringStories({ preview: !!preview })

  return {
    props: {
      quiz,
      fosteringOptions,
      fosteringStories,
      showPreviewBanner: !!preview,
    },
  }
}
