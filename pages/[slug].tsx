import { Entry } from "contentful"
import type { GetServerSideProps } from "next"
import Head from "next/head"
import { getPageContentBySlug, getQuizContent } from "../lib/cms"
import { IPageFields } from "../types/generated/contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import ContentBlock from "../components/ContentBlock"
import PageMasthead from "../components/PageMasthead"
import Link from "next/link"
import { useQuiz } from "../contexts/quiz"
import MeetTheTeam from "../components/MeetTheTeam"

interface Props {
  page: Entry<IPageFields>
}

const GenericPage = ({ page }: Props) => {
  const hasContentBlocks =
    page.fields.contentBlocks && page.fields.contentBlocks.length > 0

  const { lastVisitedPage } = useQuiz()
  
  const showTeam = page.fields.slug === "fostering-with-us"  

  return (
    <>
      <Head>
        <title>
          {page.fields.pageTitle} · Now Foster · The fostering service with
          heart
        </title>
      </Head>

      <PageMasthead
        crumbs={
          <li className="page-masthead__crumb">
            {page.fields.shortTitle || page.fields.pageTitle}
          </li>
        }
        title={page.fields.pageTitle}
        lede={page.fields.lede}
      >
        {page.fields.lede && (
          <Link href={lastVisitedPage} className="button">
            Could you foster?
          </Link>
        )}
      </PageMasthead>

      {hasContentBlocks &&
        page.fields.contentBlocks?.map(block => (
          <ContentBlock key={block.sys.id} {...block.fields} />
        ))}

      {page.fields.content && (
        <div className="container generic-content">
          {documentToReactComponents(page.fields.content)}
        </div>
      )}
    
      {showTeam
        ? (<MeetTheTeam/>) : null
      }
    </>
  )
}    

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
      page,
      showPreviewBanner: !!preview,
    },
  }
}
