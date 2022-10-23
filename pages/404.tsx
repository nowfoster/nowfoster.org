import Head from "next/head"
import Link from "next/link"

const NotFoundPage = () => (
  <>
    <Head>
      <title>
        Page not found · Now Foster · The fostering service with heart
      </title>
    </Head>

    <section className="page-masthead">
      <ul className="page-masthead__breadcrumbs">
        <li className="page-masthead__crumb">
          <Link href="/">
            <a className="page-masthead__crumb-link">Home</a>
          </Link>
        </li>
        <li className="page-masthead__crumb">404</li>
      </ul>
      <h1 className="page-masthead__headline">Page not found</h1>
    </section>
    <div className="container"></div>
  </>
)

export default NotFoundPage
