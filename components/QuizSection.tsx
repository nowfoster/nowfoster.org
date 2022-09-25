import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Link from "next/link"
import { useState } from "react"
import { QuizSection } from "../types"
import Question from "./Question"
import backIcon from "./back.svg"
import Image from "next/image"
import s from "./QuizSection.module.scss"

interface Props {
  section: QuizSection
}

const QuizSection = ({ section }: Props) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0)

  const lastQuestion = activeQuestionIndex === section.questions.length - 1

  return (
    <section className={s.section}>
      <Link href="/?quiz_open=true">
        <a>
          <Image src={backIcon} alt="" height={20} width={20} />
          {activeQuestionIndex > 0 ? "Go back" : "Back to topics"}
        </a>
      </Link>

      {/* TODO: where do we show this stuff? */}
      {/* <h2>{section.title}</h2>
      {section.intro && <div>{documentToReactComponents(section.intro)}</div>} */}

      <Question
        question={section.questions[activeQuestionIndex]}
        section={section}
      />
    </section>
  )
}

export default QuizSection
