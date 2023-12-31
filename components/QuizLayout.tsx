import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { HTMLAttributes, useEffect } from "react"
import { useQuiz } from "../contexts/quiz"
import { Quiz as IQuiz, Quiz } from "../types"
import s from "./QuizLayout.module.scss"

const getProgressThroughScreens = (
  quiz: Quiz,
  sectionIndex?: string,
  questionIndex?: string
): [number, number] => {
  const si = sectionIndex && parseInt(sectionIndex as string)
  const qi = questionIndex && parseInt(questionIndex as string)

  const totalScreens = quiz.sections.reduce(
    // add one to account for section intro page
    (total, section) => total + section.questions.length + 1,
    1 // not zero, to account for pages around them
  )

  if (typeof si !== "number") return [totalScreens, totalScreens]

  let progress = 0

  for (let i = 0; i < si; i++) {
    progress += 1 // add 1 for intro screen
    progress += quiz.sections[i].questions.length // all questions
  }

  if (typeof qi !== "number") {
    progress += 1 // add intro screen
  } else {
    progress += qi + 1 + 1 // add completed questions only
  }

  return [progress, totalScreens]
}

interface Props {
  quiz: IQuiz
  children: React.ReactNode
}

const QuizLayout = ({ quiz, children }: Props) => {
  const { push, asPath, query } = useRouter()
  const { setLastVisitedPage } = useQuiz()

  // keep resume function synced up
  useEffect(() => setLastVisitedPage(asPath), [asPath, setLastVisitedPage])

  const { sectionIndex, questionIndex } = query

  const [progressThroughScreens, totalScreens] = getProgressThroughScreens(
    quiz,
    sectionIndex as string,
    questionIndex as string
  )

  // handle ESC key
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => e.key === "Escape" && push("/")
    window.addEventListener("keyup", handleKeyUp)
    return () => window.removeEventListener("keyup", handleKeyUp)
  }, [push])

  return (
    <div className={s.backdrop}>
      <Head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <title>Could you foster? · Now Foster</title>
      </Head>

      <header className={s.header}>
        <h1>
          Could you foster?
          <span>
            {Math.min(
              100,
              Math.round((progressThroughScreens / totalScreens) * 100)
            )}
            % complete
          </span>
        </h1>

        <Link href="/" className={s.closeButton}>
          <svg width="20" height="20" viewBox="0 0 6 6" className={s.closeIcon}>
            <path d="M0.121308 0.828445L0.828414 0.121338L5.77816 5.07109L5.07105 5.77819L0.121308 0.828445Z" />
            <path d="M5.07105 0.121338L5.77816 0.828445L0.828414 5.77819L0.121307 5.07108L5.07105 0.121338Z" />
          </svg>
          <span className="visually-hidden">Close</span>
        </Link>
      </header>

      <div className={s.mount}>
        <div className={s.dialog} key={asPath}>
          <div className={s.meter}>
            <div
              style={{
                width: `${(progressThroughScreens / totalScreens) * 100}%`,
              }}
            ></div>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}

interface QuizFormProps extends HTMLAttributes<HTMLFormElement> {
  children: React.ReactNode
}

export const QuizForm = ({ children, ...props }: QuizFormProps) => (
  <form className={s.form} {...props}>
    {children}
  </form>
)

export const QuizMain = ({
  children,
  padded,
  inverted,
}: {
  children: React.ReactNode
  padded?: boolean
  inverted?: boolean
}) => (
  <main
    className={`${padded ? s.paddedMain : s.main} ${
      inverted ? s.invertedMain : ""
    }`}
  >
    {children}
  </main>
)

export const CentredQuestion = ({
  children,
}: {
  children: React.ReactNode
}) => <div className={s.centredQuestion}>{children}</div>

export const QuizFooter = ({
  children,
  goBack,
}: {
  children: React.ReactNode
  goBack: string | false
}) => (
  <footer className={s.dialogFooter}>
    {goBack ? (
      <Link className={s.goBack} href={goBack}>
        <svg width="15" height="20" viewBox="0 0 4 5" fill="none">
          <path
            d="M2.95652 0.5L1.02433 2.47513L1 2.5L2.95652 4.5"
            stroke="black"
          />
        </svg>
        Back
      </Link>
    ) : (
      <span></span>
    )}

    {children}
  </footer>
)

export default QuizLayout
