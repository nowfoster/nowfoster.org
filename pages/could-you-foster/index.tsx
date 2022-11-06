import { GetStaticProps } from "next"
import Link from "next/link"
import { getQuizContent } from "../../lib/cms"
import { Quiz as IQuiz } from "../../types"

interface Props {
  quiz: IQuiz
}

const CouldYouFoster = ({ quiz }: Props) => (
  <>
    <p>TODO: remove all this</p>
    {quiz.sections.map((sect, i) => (
      <Link key={sect.id} href={`/could-you-foster/${i}`}>
        {sect.title}
      </Link>
    ))}

    <Link href={`/could-you-foster/check-answers`}>Check answers</Link>
  </>
)

export default CouldYouFoster

export const getStaticProps: GetStaticProps = async ({ preview }) => {
  const quiz = await getQuizContent({ preview: !!preview })

  // return {
  //   redirect: {
  //     destination: `/could-you-foster/${quiz.sections[0].id}`,
  //     permanent: false,
  //   },
  // }

  return {
    props: {
      quiz,
    },
  }
}
