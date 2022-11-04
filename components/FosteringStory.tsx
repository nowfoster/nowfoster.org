import Image from "next/image"
import { FosteringStory } from "../types"
import s from "./FosteringStory.module.scss"

const FosteringStory = ({ headline, quote, image }: FosteringStory) => {
  return (
    <article className={s.story}>
      <Image
        width="300"
        height="300"
        src={`https:${image?.fields.file.url}`}
        alt={image?.fields.description}
      />

      <div>
        <h3>{headline}</h3>

        <blockquote>{quote}</blockquote>
      </div>
    </article>
  )
}

export default FosteringStory
