import { GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { KeyboardEventHandler, useEffect } from "react"
import Quiz from "../../components/Quiz"
import SectionList from "../../components/SectionList"
import { getQuizContent } from "../../lib/cms"
import { Quiz as IQuiz } from "../../types"
import s from "../could-you-foster.module.scss"

interface Props {
  quiz: IQuiz
}

const CouldYouFoster = ({ quiz }: Props) => {
  const { push } = useRouter()

  // handle ESC key
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => e.key === "Escape" && push("/")
    window.addEventListener("keyup", handleKeyUp)
    return () => window.removeEventListener("keyup", handleKeyUp)
  }, [push])

  return (
    <div className={s.canvas}>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>
          Could you foster? · Now Foster · The fostering service with heart
        </title>
      </Head>

      <header className={s.header}>
        <h1>Could you foster?</h1>

        <Link href="/" className={s.closeButton}>
          <svg width="20" height="20" viewBox="0 0 6 6" className={s.closeIcon}>
            <path d="M0.121308 0.828445L0.828414 0.121338L5.77816 5.07109L5.07105 5.77819L0.121308 0.828445Z" />
            <path d="M5.07105 0.121338L5.77816 0.828445L0.828414 5.77819L0.121307 5.07108L5.07105 0.121338Z" />
          </svg>
          <span className="visually-hidden">Close</span>
        </Link>
      </header>

      <div className={s.mount}>
        <main className={s.inner}>{/* <SectionList quiz={quiz} /> */}</main>
      </div>
    </div>
  )
}

export default CouldYouFoster

export const getStaticProps: GetStaticProps = async ({ preview }) => {
  const quiz = await getQuizContent({ preview: !!preview })

  return {
    props: {
      quiz,
      showPreviewBanner: !!preview,
    },
  }
}
