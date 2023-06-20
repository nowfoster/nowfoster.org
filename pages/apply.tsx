import { GetStaticProps } from "next"
import Head from "next/head"
import ApplicationForm from "../components/ApplicationForm"
import PageMasthead from "../components/PageMasthead"
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
        <title>Book a chat · Now Foster</title>
      </Head>

      <PageMasthead title="Book an intro chat">
        <p className={s.subtitle}>
          Choose how you&apos;d like to chat with our Now Foster coach and the
          time that suits you best.
        </p>
      </PageMasthead>

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
