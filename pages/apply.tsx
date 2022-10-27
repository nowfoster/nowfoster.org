import { GetStaticProps, NextPageContext } from "next"
import Head from "next/head"
import Link from "next/link"
import ApplicationForm from "../components/ApplicationForm"
import { getQuizContent } from "../lib/cms"

const ApplyPage = () => {
  return (
    <>
      <Head>
        <title>Apply · Now Foster · The fostering service with heart</title>
      </Head>

      <section className="page-masthead">
        <ul className="page-masthead__breadcrumbs">
          <li className="page-masthead__crumb">
            <Link href="/">
              <a className="page-masthead__crumb-link">Home</a>
            </Link>
          </li>
          <li className="page-masthead__crumb">Apply</li>
        </ul>
        <h1 className="page-masthead__headline">Apply to foster</h1>
      </section>
      <div className="container">
        <ApplicationForm />
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
