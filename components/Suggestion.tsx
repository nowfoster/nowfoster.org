import { Suggestion } from "../types"

interface Props {
  suggestion: Suggestion
}

const Suggestion = ({ suggestion }: Props) => (
  <article>
    <h3>{suggestion.title}</h3>
    <div>{JSON.stringify(suggestion.content)}</div>
  </article>
)

export default Suggestion
