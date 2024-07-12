import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { IContentBlockFields } from "../types/generated/contentful";

import s from "./ContentBlock.module.scss";
import ProcessTimeline from "./ProcessTimeline";
import FosteringStories from "./FosteringStories";

const ContentBlock = (contentBlock: IContentBlockFields) => (
  <section className={s.contentBlock}>
    <div className="container">
      {contentBlock.preCaption && (
        <p className={s.preCaption}>{contentBlock.preCaption}</p>
      )}
      <h2 className="section-heading">{contentBlock.headline}</h2>

      {contentBlock.subheadline && (
        <p className="section-caption">{contentBlock.subheadline}</p>
      )}

      {contentBlock.includeTimeline && <ProcessTimeline />}

      <div className={s.sideBySide}>
        <div>{documentToReactComponents(contentBlock.bodyText)}</div>

        <Image
          width="300"
          height="300"
          src={`https:${contentBlock.image?.fields.file.url}`}
          alt={contentBlock.image?.fields.description}
        />
      </div>
    </div>
  </section>
);

export default ContentBlock;
