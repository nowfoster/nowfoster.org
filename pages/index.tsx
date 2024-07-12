import type { GetServerSideProps, GetStaticProps } from "next";
import s from "./index.module.scss";
import {
  getFosteringOptions,
  getFosteringStories,
  getQuizContent,
} from "../lib/cms";
import { FosteringOption, FosteringStory as IFosteringStory } from "../types";
import Link from "next/link";
import { useQuiz } from "../contexts/quiz";
import Image from "next/image";

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
          <h1>Fostering reimagined.</h1>

          <p>
            Now Foster is a charity that enables more people to experience the
            joy of fostering. We work with public sector organisations across
            the UK to reimagine fostering and empower brilliant foster carers to
            support children and young people.
          </p>

          <Link
            href="mailto:hello@nowfoster.org"
            className="button button--primary"
            target="_blank"
          >
            Get in touch
          </Link>
        </div>
      </section>

      <section className={s.transition}>
        <div className="container">
          <h2>Our mission:</h2>
          <h3>
            To mainstream foster care so more amazing people will empower and
            inspire young people in care.
          </h3>
        </div>
      </section>

      <section>
        <Image
          src="/rivage-OV44gxH71DU-unsplash.jpg"
          alt="children playing with pens"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
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

          <Link
            href="mailto:hello@nowfoster.org"
            className="button button--primary"
            target="_blank"
          >
            Get in touch
          </Link>
        </div>
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
          <h2 className="section-heading">Why fostering matters</h2>
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
