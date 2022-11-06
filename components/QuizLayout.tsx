import { motion } from "framer-motion"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { HTMLAttributes, useEffect } from "react"
import { useQuiz } from "../contexts/quiz"
import { Quiz as IQuiz } from "../types"
import s from "./QuizLayout.module.scss"

interface Props {
  quiz: IQuiz
  children: React.ReactNode
}

const QuizLayout = ({ quiz, children }: Props) => {
  const { push, asPath } = useRouter()
  const { completedAnswersCount, setLastVisitedPage } = useQuiz()

  useEffect(() => setLastVisitedPage(asPath), [asPath, setLastVisitedPage])

  const totalQuestions = quiz.sections.reduce(
    (total, section) =>
      total +
      section.questions.filter(q => q.questionType !== "explorer").length,
    0
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
        <link rel="shortcut icon" href="/favicon.png" />
        <title>
          Could you foster? · Now Foster · The fostering service with heart
        </title>
      </Head>

      <header className={s.header}>
        <h1>
          Could you foster?
          <span>
            {Math.round((completedAnswersCount / totalQuestions) * 100)}%
            complete
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
        <div className={s.dialog}>
          <meter
            value={completedAnswersCount}
            max={totalQuestions}
            className={s.meter}
          />

          {/* <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "calc(100vw - 50%)" }}
            key={route}
          >
            fuck
          </motion.div> */}

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
}: {
  children: React.ReactNode
  padded?: boolean
}) => <main className={padded ? s.paddedMain : s.main}>{children}</main>

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
    {goBack && (
      <Link className={s.goBack} href={goBack}>
        <svg width="15" height="20" viewBox="0 0 4 5" fill="none">
          <path
            d="M2.95652 0.5L1.02433 2.47513L1 2.5L2.95652 4.5"
            stroke="black"
          />
        </svg>
        Back
      </Link>
    )}

    {children}
  </footer>
)

export default QuizLayout
