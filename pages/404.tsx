import { GetServerSideProps } from "next"
import Head from "next/head"
import Link from "next/link"
import { getQuizContent } from "../lib/cms"
import s from "./404.module.scss"

const NotFoundPage = () => (
  <>
    <Head>
      <title>
        🤷‍♀️ Page not found · Now Foster · The fostering service with heart
      </title>
    </Head>

    <section className={s.notFound}>
      <div className="container">
        <p>404</p>
        <h1>Page not found</h1>
        <p>
          <Link href="/">Go back to the home page</Link>
        </p>
      </div>
    </section>
  </>
)

export default NotFoundPage
