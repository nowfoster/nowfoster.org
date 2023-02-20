import { Entry } from "contentful"
import type { GetServerSideProps } from "next"
import Head from "next/head"
import { getPageContentBySlug, getTeamMembers } from "../lib/cms"
import { IPageFields } from "../types/generated/contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import ContentBlock from "../components/ContentBlock"
import PageMasthead from "../components/PageMasthead"
import Link from "next/link"
import { useQuiz } from "../contexts/quiz"
import MeetTheTeam from "../components/MeetTheTeam"
import { TeamMember } from "../types"

interface Props {
  page: Entry<IPageFields>
  teamMembers?: TeamMember[]
}

const GenericPage = ({ page, teamMembers }: Props) => {
  const hasContentBlocks =
    page.fields.contentBlocks && page.fields.contentBlocks.length > 0

  const { lastVisitedPage } = useQuiz()

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
          <Link href={lastVisitedPage} className="button button--primary">
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

      {teamMembers && <MeetTheTeam teamMembers={teamMembers} />}
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

  let teamMembers
  if (query.slug === "fostering-with-us") teamMembers = await getTeamMembers()

  if (!page)
    return {
      notFound: true,
    }

  return {
    props: {
      page,
      teamMembers: teamMembers || null,
      showPreviewBanner: !!preview,
    },
  }
}
