import "../styles/index.scss"
import type { AppProps } from "next/app"
import { QuizAnswersProvider } from "../contexts/quiz"
import Layout from "../components/Layout"
import { ConfirmDialogProvider } from "../contexts/confirmDialog"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QuizAnswersProvider>
      <ConfirmDialogProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ConfirmDialogProvider>
    </QuizAnswersProvider>
  )
}

export default MyApp
