import { GetStaticProps } from "next";
import Link from "next/link";
import { Icon } from "../../components/LoaderButton";
import { QuizFooter, QuizMain } from "../../components/QuizLayout";
import { useQuiz } from "../../contexts/quiz";
import { getQuizContent } from "../../lib/cms";
import { Quiz as IQuiz } from "../../types";
import s from "./check-answers.module.scss";

interface Props {
  quiz: IQuiz;
}

const CheckAnswers = ({ quiz }: Props) => {
  const { quizAnswers } = useQuiz();

  const lastSectionIndex = quiz.sections.length - 1;
  const goBackLink = `/could-you-foster/${lastSectionIndex}/${
    quiz.sections?.[lastSectionIndex].questions.length - 1
  }`;

  return (
    <>
      <QuizMain padded>
        <h2>Almost done</h2>
        <p>
          We hope you learned some new things around fostering and are still
          curious. Book a 30 minute intro chat to ask us anything. Over the
          phone or video call, at a time that suits you.
        </p>

        <h3 className={s.subheading}>Your answers</h3>

        <div className={s.answers}>
          {Object.entries(quizAnswers).map(([sectionTitle, sectionAnswers]) => (
            <div key={sectionTitle} className={s.section}>
              <dl>
                {Object.entries(sectionAnswers).map(([question, answer]) => (
                  <div key={question}>
                    <dt>{question}</dt>
                    <dd>
                      {Array.isArray(answer) ? answer.join(", ") : answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </QuizMain>

      <QuizFooter goBack={goBackLink}>
        <div className={s.choiceButtons}>
          <Link
            href="https://forms.gle/SuHhqH82v1hMjjcs8"
            className="button button--secondary"
          >
            I&apos;m not ready <Icon />
          </Link>
          <Link href="/could-you-foster/check-postcode" className="quizButton">
            Book a chat <Icon />
          </Link>
        </div>
      </QuizFooter>
    </>
  );
};

export default CheckAnswers;

export const getStaticProps: GetStaticProps = async ({ preview }) => {
  const quiz = await getQuizContent({ preview: !!preview });

  return {
    props: {
      quiz,
      showPreviewBanner: !!preview,
    },
  };
};
