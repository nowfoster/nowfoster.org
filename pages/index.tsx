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

          <p>Find out what fostering could add to your life.</p>

          <Link href={lastVisitedPage} className="button">
            Could you foster? <Icon />
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
                <h3>{option.title}</h3>
                <p>{option.description}</p>
                <p>{option.conclusion}</p>
              </article>
            ))}
          </div>

          <Link href={lastVisitedPage} className="button">
            Could you foster? <Icon />
          </Link>
        </div>
      </section>

      <section className={s.stories}>
        <h2 className="section-heading">Fostering stories</h2>
        <p className="section-caption">
          Not all heroes wear capes. Join our community of foster carers.
        </p>

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

          <p>First of all...why not?</p>
          <ul>
            <li>
              If you don’t want to foster then you can make any reason fit, and
              that’s ok. But if there’s any part of you that’s curious, your
              potential is unimaginable
            </li>
            <li>
              There will be a deficit of around 25,000 foster care families by
              2026
            </li>
            <li>
              Most young people in foster care have a sibling yet almost ¾ are
              separated! This is a huge number of young people not living with
              their brothers and sisters. The main reason… not enough bedrooms
            </li>
            <li>
              We saw the country’s response to supporting people from Ukraine,
              why can’t we do the same with foster care?
            </li>
          </ul>
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
