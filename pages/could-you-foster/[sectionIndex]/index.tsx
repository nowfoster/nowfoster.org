import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { GetStaticProps } from "next"
import Link from "next/link"
import { Icon } from "../../../components/LoaderButton"
import ProgressTimeline from "../../../components/ProgressTimeline"
import { QuizFooter, QuizMain } from "../../../components/QuizLayout"
import { getQuizContent } from "../../../lib/cms"
import { Quiz, QuizSection } from "../../../types"
import s from "./index.module.scss"
import "../../../components/Question.module.scss"
import Image from "next/image"

interface Props {
  section: QuizSection
  sectionIndex: number
  quiz: Quiz
}

const SectionPage = ({ section, sectionIndex, quiz }: Props) => {
  const previousSection = quiz.sections[sectionIndex - 1]

  const hasQuestions = section.questions.length > 0
  const previousSectionHasQuestions = previousSection?.questions.length > 0

  const goBackLink =
    previousSection &&
    `/could-you-foster/${sectionIndex - 1}/${
      previousSectionHasQuestions ? previousSection.questions.length - 1 : ""
    }`

  return (
    <>
      <QuizMain padded>
        <div className={s.columns}>
          <div>
            <h2>{section.title}</h2>
            {section.intro && (
              <div>{documentToReactComponents(section.intro)}</div>
            )}
          </div>

          {hasQuestions ? (
            <ProgressTimeline
              sections={quiz.sections}
              currentSectionIndex={sectionIndex}
            />
          ) : section.image ? (
            <Image
              width={500}
              height={500}
              src={`https:${section.image?.fields.file.url}`}
              alt={section.image?.fields.description}
            />
          ) : null}
        </div>
      </QuizMain>

      <QuizFooter goBack={goBackLink}>
        <Link
          href={
            hasQuestions
              ? `/could-you-foster/${sectionIndex}/0`
              : `/could-you-foster/${sectionIndex + 1}`
          }
          className="quizButton"
        >
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
