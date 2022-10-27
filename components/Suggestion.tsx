import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Suggestion as ISuggestion } from "../types"
import s from "./Suggestion.module.scss"

interface Props {
  suggestion: ISuggestion
}

const Suggestion = ({ suggestion }: Props) => (
  <article className={s.article}>
    <h3 className={s.headline}>{suggestion.title}</h3>

    {suggestion.content && (
      <div>{documentToReactComponents(suggestion.content)}</div>
    )}
  </article>
)

export default Suggestion
