import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { GetStaticProps } from "next"
import Link from "next/link"
import { Icon } from "../../../components/LoaderButton"
import { QuizFooter, QuizMain } from "../../../components/QuizLayout"
import { useQuiz } from "../../../contexts/quiz"
import { getQuizContent } from "../../../lib/cms"
import { QuizSection } from "../../../types"

interface Props {
  section: QuizSection
  sectionIndex: number
}

const SectionPage = ({ section, sectionIndex }: Props) => {
  const { quizAnswers } = useQuiz()

  const goBackLink =
    sectionIndex > 0 && `/could-you-foster/${sectionIndex - 1}/0`

  return (
    <>
      <QuizMain padded>
        <h2>{section.title}</h2>
        {section.intro && <div>{documentToReactComponents(section.intro)}</div>}
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
