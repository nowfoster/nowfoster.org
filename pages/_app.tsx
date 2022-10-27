import "../styles/index.scss"
import type { AppProps } from "next/app"
import { QuizAnswersProvider } from "../contexts/quiz"
import Layout from "../components/Layout"
import PreviewBanner from "../components/PreviewBanner"
import ConfirmationMessage from "../components/ConfirmationMessage"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QuizAnswersProvider>
      <Layout {...pageProps}>
        {pageProps?.showPreviewBanner && <PreviewBanner />}

        <ConfirmationMessage />
        <Component {...pageProps} />
      </Layout>
    </QuizAnswersProvider>
  )
}

export default MyApp
