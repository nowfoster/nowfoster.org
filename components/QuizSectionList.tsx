import { QuizSection } from "../types"

interface Props {
  sections: QuizSection[]
}

const QuizSectionList = ({ sections }: Props) => (
  <ul>
    {sections.map(section => (
      <li key={section.id}>
        <button onClick={() => null}>{section.title}</button>
      </li>
    ))}
  </ul>
)

export default QuizSectionList
