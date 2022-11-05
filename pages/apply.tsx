import { GetStaticProps, NextPageContext } from "next"
import Head from "next/head"
import Link from "next/link"
import ApplicationForm from "../components/ApplicationForm"
import { getQuizContent } from "../lib/cms"
import { Quiz } from "../types"
import s from "./apply.module.scss"

interface Props {
  quiz: Quiz
}

const ApplyPage = ({ quiz }: Props) => {
  return (
    <>
      <Head>
        <title>Apply · Now Foster · The fostering service with heart</title>
      </Head>

      <section className={s.masthead}>
        <ul className={s.breadcrumbs}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>Apply</li>
        </ul>
        <h1>Apply to foster</h1>
      </section>

      <div className="container">
        <ApplicationForm quiz={quiz} />
      </div>
    </>
  )
}

export default ApplyPage

export const getStaticProps: GetStaticProps = async ({ preview }) => {
  const quiz = await getQuizContent({ preview: !!preview })

  return {
    props: {
      quiz,
      showPreviewBanner: !!preview,
    },
  }
}
