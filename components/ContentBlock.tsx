import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { content } from "googleapis/build/src/apis/content"
import Image from "next/image"
import { IContentBlockFields } from "../types/generated/contentful"

const ContentBlock = (contentBlock: IContentBlockFields) => (
  <section>
    <h2>{contentBlock.headline}</h2>

    {contentBlock.subheadline && <p>{contentBlock.subheadline}</p>}

    <div>{documentToReactComponents(contentBlock.bodyText)}</div>

    <Image
      width="300px"
      height="300px"
      src={`https:${contentBlock.image?.fields.file.url}`}
      alt={contentBlock.image?.fields.description}
    />
  </section>
)

export default ContentBlock
