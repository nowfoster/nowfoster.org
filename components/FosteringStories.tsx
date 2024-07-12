import type { GetServerSideProps } from "next";
import s from "./FosteringStories.module.scss";
import { getFosteringStories } from "../lib/cms";
import { blogUrl } from "../config";
import Slider from "../components/Slider";
import { FosteringStory as IFosteringStory } from "../types";

interface Props {
  fosteringStories: IFosteringStory[];
}

const FosteringStories = ({ fosteringStories }: Props) => (
  <section className={s.stories}>
    <h2 className="section-heading">Fostering stories</h2>
    <p className="section-caption">Hear about people&apos;s experiences</p>

    <Slider stories={fosteringStories} />

    <a href={blogUrl} className="button button--primary">
      Read stories
    </a>
  </section>
);

export default FosteringStories;

export const getServerSideProps: GetServerSideProps = async ({ preview }) => {
  const fosteringStories = await getFosteringStories({ preview: !!preview });

  return {
    props: {
      fosteringStories,
    },
  };
};
