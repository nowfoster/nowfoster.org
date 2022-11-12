import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Suggestion as ISuggestion } from "../types"
import s from "./Suggestion.module.scss"

interface Props {
  suggestion?: ISuggestion | null
}

const Suggestion = ({ suggestion }: Props) => (
  <article className={suggestion ? s.article : s.emptyArticle}>
    {suggestion ? (
      <>
        <h3 className={s.headline}>{suggestion.title}</h3>
        {suggestion.content && (
          <div className={s.richText}>
            {documentToReactComponents(suggestion.content)}
          </div>
        )}
      </>
    ) : (
      <p>Choose an option to continue</p>
    )}
  </article>
)

export default Suggestion
