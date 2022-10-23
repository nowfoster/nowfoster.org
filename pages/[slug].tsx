import { Entry } from "contentful"
import type { GetServerSideProps } from "next"
import Head from "next/head"
import Link from "next/link"
import { getPageContentBySlug } from "../lib/cms"
import { IPageFields } from "../types/generated/contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

interface Props {
  page: Entry<IPageFields>
}

const GenericPage = ({ page }: Props) => (
  <>
    <Head>
      <title>
        {page.fields.pageTitle} · Now Foster · The fostering service with heart
      </title>
    </Head>

    <section className="page-masthead">
      <ul className="page-masthead__breadcrumbs">
        <li className="page-masthead__crumb">
          <Link href="/">
            <a className="page-masthead__crumb-link">Home</a>
          </Link>
        </li>
        <li className="page-masthead__crumb">
          {page.fields.shortTitle || page.fields.pageTitle}
        </li>
      </ul>
      <h1 className="page-masthead__headline">{page.fields.pageTitle}</h1>
    </section>
    <div className="container generic-content">
      {documentToReactComponents(page.fields.content)}
    </div>
  </>
)

export default GenericPage

export const getServerSideProps: GetServerSideProps = async ({
  preview,
  query,
}) => {
  const page = await getPageContentBySlug(query.slug as string, {
    preview: !!preview,
  })

  if (!page)
    return {
      notFound: true,
    }

  return {
    props: {
      page: page,
      showPreviewBanner: !!preview,
    },
  }
}
