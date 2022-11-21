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
      {sections
        .filter(section => section.questions.length > 0)
        .map((section, i) => (
          <li
            key={section.id}
            className={currentSectionIndex > i ? s.completed : undefined}
          >
            {section.title}
            {currentSectionIndex > i && (
              <span className="visually-hidden">Completed</span>
            )}
          </li>
        ))}
    </ol>
  )
}

export default ProgressTimeline
