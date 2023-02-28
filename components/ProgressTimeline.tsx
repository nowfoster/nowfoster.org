import { sendNotifications } from "../lib/emails"
import { QuizSection } from "../types"
import s from "./ProgressTimeline.module.scss"

interface Props {
  currentSectionIndex: number
  sections: QuizSection[]
}

const ProgressTimeline = ({ currentSectionIndex, sections }: Props) => {
  return (
    <ol className={s.timeline}>
      {sections.map((section, i) => {
        if (section.questions.length > 0)
          return (
            <li
              key={section.id}
              className={currentSectionIndex > i ? s.completed : undefined}
            >
              {section.shortTitle || section.title}
              {currentSectionIndex > i && (
                <span className="visually-hidden">Completed</span>
              )}
            </li>
          )

        return null
      })}
    </ol>
  )
}

export default ProgressTimeline
