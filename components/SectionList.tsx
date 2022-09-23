import Link from "next/link"
import { QuizSection } from "../types"

interface Props {
  sections: QuizSection[]
}

const SectionList = ({ sections }: Props) => (
  <>
    <h2>Explore topics</h2>

    <p>You can answer questions in any order.</p>
    <ol>
      {sections
        .sort((a, b) => (a.order || 0) - (b.order || 0)) // respect sort order
        .map((section, i) => (
          <li key={section.id}>
            <Link href={`/?quiz_section=${i}`}>{section.title}</Link>
          </li>
        ))}
    </ol>
  </>
)

export default SectionList
