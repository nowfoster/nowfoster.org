import { Question } from "../types"
import Suggestion from "./Suggestion"

interface Props {
  question: Question
}

const Question = ({ question }: Props) => (
  <>
    <fieldset>{JSON.stringify(question)}</fieldset>

    {question.suggestion && <Suggestion suggestion={question.suggestion} />}
  </>
)

export default Question
