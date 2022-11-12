import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { GetStaticProps } from "next"
import Link from "next/link"
import { Icon } from "../../../components/LoaderButton"
import ProgressTimeline from "../../../components/ProgressTimeline"
import { QuizFooter, QuizMain } from "../../../components/QuizLayout"
import { getQuizContent } from "../../../lib/cms"
import { Quiz, QuizSection } from "../../../types"
import s from "./index.module.scss"

interface Props {
  section: QuizSection
  sectionIndex: number
  quiz: Quiz
}

const SectionPage = ({ section, sectionIndex, quiz }: Props) => {
  const previousSection = quiz.sections[sectionIndex - 1]

  const goBackLink =
    previousSection &&
    `/could-you-foster/${sectionIndex - 1}/${
      previousSection.questions.length - 1
    }`

  return (
    <>
      <QuizMain padded>
        <div className={s.columns}>
          <div>
            <p>
              Section {sectionIndex + 1} of {quiz.sections.length}
            </p>
            <h2>{section.title}</h2>
            {section.intro && (
              <div>{documentToReactComponents(section.intro)}</div>
            )}
          </div>

          <ProgressTimeline
            sections={quiz.sections}
            currentSectionIndex={sectionIndex}
          />
        </div>
      </QuizMain>

      <QuizFooter goBack={goBackLink}>
        <Link href={`/could-you-foster/${sectionIndex}/0`} className="button">
          Continue <Icon />
        </Link>
      </QuizFooter>
    </>
  )
}

export default SectionPage

export const getServerSideProps: GetStaticProps = async ({
  preview,
  params,
}) => {
  const quiz = await getQuizContent({ preview: !!preview })

  const sectionIndex = parseInt(params?.sectionIndex as string)
  const section = quiz.sections[sectionIndex]

  if (!section) return { notFound: true }

  return {
    props: {
      quiz,
      section,
      showPreviewBanner: !!preview,
      sectionIndex,
    },
  }
}
