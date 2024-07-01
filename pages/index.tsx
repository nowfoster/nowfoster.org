import type { GetServerSideProps, GetStaticProps } from "next";
import s from "./index.module.scss";
import { blogUrl } from "../config";
import {
  getFosteringOptions,
  getFosteringStories,
  getQuizContent,
} from "../lib/cms";
import { FosteringOption, FosteringStory as IFosteringStory } from "../types";
import Slider from "../components/Slider";
import Link from "next/link";
import { useQuiz } from "../contexts/quiz";

interface Props {
  fosteringOptions: FosteringOption[];
  fosteringStories: IFosteringStory[];
}

const Home = ({ fosteringOptions, fosteringStories }: Props) => {
  const { lastVisitedPage } = useQuiz();
  return (
    <>
      <section className={s.hero}>
        <div className="container">
          <h1>
            Join our pioneer programme for weekend foster carers in London
          </h1>

          <p>
            We help you to inspire children and build meaningful relationships.
          </p>

          <Link href={lastVisitedPage} className="button button--primary">
            Get started
          </Link>
        </div>
      </section>

      <section className={s.transition}>
        <div className="container">
          <h2>
            Whether you&apos;re a busy barrister, a multitasking manager, a
            retired radiologist or a shaky skateboarder
          </h2>
          <h1>Become a Weekender</h1>
        </div>
      </section>

      <section className={s.options} id="kinds-of-fostering">
        <div className="container">
          <h2 className="section-heading">Weekend fostering</h2>

          <p className="section-caption">
            As a Weekender you will usually spend one weekend per month with a
            child or a young person in care to help them achieve their goals,
            try new things and have fun!
          </p>

          <div className={s.optionsList}>
            {fosteringOptions.map((option) => (
              <article key={option.id}>
                <div className={s.iconContainer}>
                  <img src={option.icon?.fields.file.url} alt="" />
                </div>
                <h3>{option.title}</h3>
                <p>{option.description}</p>
                <p>{option.conclusion}</p>
              </article>
            ))}
          </div>

          <Link href={lastVisitedPage} className="button button--primary">
            Get started
          </Link>
        </div>
      </section>

      <section className={s.stories}>
        <h2 className="section-heading">Fostering stories</h2>
        <p className="section-caption">Hear about people&apos;s experiences</p>

        <Slider stories={fosteringStories} />

        <a href={blogUrl} className="button button--primary">
          Read stories
        </a>
      </section>

      {/* <section className={s.story}>
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
          <Link href="/who-we-are" className="button button--primary">
            Learn more
          </Link>
        </div>
      </section> */}

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
              <p>More than </p>
              <h1>1 in 3</h1>
              <p>
                siblings are separated in foster care. The main reason: not
                enough bedrooms
              </p>
            </div>
            <div>
              <p>Just</p>
              <h1>13%</h1>
              <p>
                of care experienced young people enter higher education,
                compared to 45% of their peers
              </p>
            </div>
          </div>
          <Link href={lastVisitedPage} className="button button--primary">
            Get started
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ preview }) => {
  const fosteringOptions = await getFosteringOptions({ preview: !!preview });
  const fosteringStories = await getFosteringStories({ preview: !!preview });

  return {
    props: {
      fosteringOptions,
      fosteringStories,
      showPreviewBanner: !!preview,
    },
  };
};
