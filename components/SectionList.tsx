import Link from "next/link"
import { QuizSection } from "../types"
import s from "./SectionList.module.scss"

interface Props {
  sections: QuizSection[]
  setActiveSectionId: (id: string) => void
}

const SectionList = ({ sections, setActiveSectionId }: Props) => (
  <div className={s.sectionList}>
    <h2 className={s.headline}>Explore topics</h2>

    <p>You can answer questions in any order.</p>
    <p>
      Your answers are private unless you choose to share them with us when
      making an application.
    </p>

    <ol className={s.list}>
      {sections
        .sort((a, b) => (a.order || 0) - (b.order || 0)) // respect sort order
        .map(section => (
          <li key={section.id}>
            <button
              className={s.sectionLink}
              onClick={() => setActiveSectionId(section.id)}
            >
              {section.title}
            </button>
          </li>
        ))}
    </ol>
  </div>
)

export default SectionList
