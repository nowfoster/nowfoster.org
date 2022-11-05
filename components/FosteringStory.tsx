import Image from "next/image"
import Link from "next/link"
import { FosteringStory } from "../types"
import s from "./FosteringStory.module.scss"

const FosteringStory = ({ headline, quote, image, url }: FosteringStory) => {
  return (
    <article className={s.story}>
      <Image
        width={500}
        height={500}
        src={`https:${image?.fields.file.url}`}
        alt={image?.fields.description}
      />

      <div>
        <h3>
          <Link href={url}>{headline}</Link>
        </h3>
        <blockquote>{quote}</blockquote>
      </div>
    </article>
  )
}

export default FosteringStory
