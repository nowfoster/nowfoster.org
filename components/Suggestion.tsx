import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Suggestion } from "../types"

interface Props {
  suggestion: Suggestion
}

const Suggestion = ({ suggestion }: Props) => (
  <article>
    <h3>{suggestion.title}</h3>
    {suggestion.content && (
      <div>{documentToReactComponents(suggestion.content)}</div>
    )}
  </article>
)

export default Suggestion
