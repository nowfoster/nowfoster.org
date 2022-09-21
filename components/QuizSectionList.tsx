import Link from "next/link"
import { QuizSection } from "../types"

interface Props {
  sections: QuizSection[]
}

const QuizSectionList = ({ sections }: Props) => (
  <>
    <h2>Explore topics</h2>

    <p>You can answer questions in any order.</p>
    <ol>
      {sections.map((section, i) => (
        <li key={section.id}>
          <Link href={`/?quiz_section=${i}`}>{section.title}</Link>

          {/* <button onClick={() => null}>{section.title}</button> */}
        </li>
      ))}
    </ol>
  </>
)

export default QuizSectionList
