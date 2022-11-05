import type { GetStaticProps } from "next"
import { Icon } from "../components/LoaderButton"
import s from "./index.module.scss"
import { blogUrl } from "../config"
import {
  getFosteringOptions,
  getFosteringStories,
  getQuizContent,
} from "../lib/cms"
import { FosteringOption, FosteringStory as IFosteringStory } from "../types"
import Slider from "../components/Slider"
import Link from "next/link"

interface Props {
  fosteringOptions: FosteringOption[]
  fosteringStories: IFosteringStory[]
}

const Home = ({ fosteringOptions, fosteringStories }: Props) => {
  return (
    <>
      <section className={s.hero}>
        <div className="container">
          <h1>Forget everything you think you know about fostering</h1>

          <p>Explore what it really takes to be a great foster carer </p>

          <Link href="/could-you-foster" className="button">
            Could you foster? <Icon />
          </Link>
        </div>
      </section>

      <section className={s.options} id="kinds-of-fostering">
        <div className="container">
          <h2 className="section-heading">Kinds of fostering</h2>

          <p className="section-caption">
            There&apos;s lots of choice and flexibility in fostering.
          </p>

          <div className={s.optionsList}>
            {fosteringOptions.map(option => (
              <article key={option.id}>
                <h3>{option.title}</h3>
                <p>{option.description}</p>
                <p>{option.conclusion}</p>
              </article>
            ))}
          </div>

          <Link href="/could-you-foster" className="button">
            Could you foster? <Icon />
          </Link>
        </div>
      </section>

      <section className={s.stories}>
        <h2 className="section-heading">Fostering stories</h2>
        <p className="section-caption">Join our community of foster carers.</p>

        <Slider stories={fosteringStories} />

        <a href={blogUrl} className="button">
          Explore more stories
          <Icon />
        </a>
      </section>

      <section className={s.story}>
        <div className="container">
          <h2 className="section-heading">Fostering with us</h2>
          <p>
            Now Foster is a team of innovative social workers, designers and
            entrepreneurs who want to change how fostering is done.
          </p>
          <p>
            We work alongside innovative councils across the UK to find and
            empower brilliant people to care for children and young people.
          </p>

          <Link href="/fostering-with-us" className="button">
            Learn more
            <Icon />
          </Link>
        </div>
      </section>

      <section className={s.story} id="why-foster">
        <div className="container">
          <h2 className="section-heading">Why foster?</h2>
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
}

export default Home

export const getStaticProps: GetStaticProps = async ({ preview }) => {
  const fosteringOptions = await getFosteringOptions({ preview: !!preview })
  const fosteringStories = await getFosteringStories({ preview: !!preview })

  return {
    props: {
      fosteringOptions,
      fosteringStories,
      showPreviewBanner: !!preview,
    },
  }
}
