import "../styles/index.scss"
import type { AppProps } from "next/app"
import { QuizAnswersProvider } from "../contexts/quiz"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QuizAnswersProvider>
      <Component {...pageProps} />
    </QuizAnswersProvider>
  )
}

export default MyApp
