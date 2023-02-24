import type { GetServerSideProps, GetStaticProps } from "next"
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
import { useQuiz } from "../contexts/quiz"

interface Props {
  fosteringOptions: FosteringOption[]
  fosteringStories: IFosteringStory[]
}

const Home = ({ fosteringOptions, fosteringStories }: Props) => {
  const { lastVisitedPage } = useQuiz()
  return (
    <>
      <section className={s.hero}>
        <div className="container">
          <h1>Forget everything you think you know about fostering</h1>

          <p>Find out what it could add to your life.</p>

          <Link href={lastVisitedPage} className="button button--primary">
            Could you foster?
          </Link>
        </div>
      </section>

      <section className={s.options} id="kinds-of-fostering">
        <div className="container">
          <h2 className="section-heading">Your fostering options</h2>

          <p className="section-caption">
            There&apos;s lots of choice and flexibility in fostering.
          </p>

          <div className={s.optionsList}>
            {fosteringOptions.map(option => (
              <article key={option.id}>
                <img src={option.icon?.fields.file.url} />
                <h3>{option.title}</h3>
                <p>{option.description}</p>
                <p>{option.conclusion}</p>
              </article>
            ))}
          </div>

          <Link href={lastVisitedPage} className="button button--primary">
            Could you foster?
          </Link>
        </div>
      </section>

      <section className={s.transition}>
        <div className="container">
          <h2>
            Whether you&apos;re a brilliant barrister, a crap baker, a multitasking manager, 
            a software developer or a shakey skateboarder.
          </h2>
          <h1>You&apos;re you <span>+</span> Fostering.</h1>
        </div>
      </section>

      <section className={s.stories}>
        <h2 className="section-heading">Fostering stories</h2>
        <p className="section-caption">
          Hear about people&apos;s experiences
        </p>

        <Slider stories={fosteringStories} />

        <a href={blogUrl} className="button button--primary">
          Explore more
        </a>
      </section>

      <section className={s.story}>
        <div className="container">
          <h2 className="section-heading">Who we are</h2>
            <div className={s.story__body}>
              <p className="section-caption">
                Now Foster is a team of innovative social workers, designers and
                entrepreneurs who want to change how fostering is done.
              </p>
              <p className="section-caption">
                We work alongside innovative councils across the UK to find and
                empower brilliant people to care for children and young people.
              </p>
            </div>
          <Link href="/fostering-with-us" className="button button--primary">
            Learn more
          </Link>
        </div>
      </section>

      <section className={s.story}>
        <div className="container">
          <h2 className="section-heading">Why foster?</h2>
          <div className={s.inner}>
            <div>
              <h1>25,000</h1>
              <p>
                the shortage of foster care families by 2026. The need for
                foster carers has never been greater
              </p>
            </div>
            <div>
              <h1>3 in 4</h1>
              <p>
                siblings are separated in foster care. The main reason... not
                enough bedrooms
              </p>
            </div>
            <div>
              <h1>94,900</h1>
              <p>the total number of Ukrainians staying with British families. Why can’t we do the same for UK children?</p>
            </div>
          </div>
          <Link href={lastVisitedPage} className="button button--primary">
            Could you foster?
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ preview }) => {
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
