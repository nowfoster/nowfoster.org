import "../styles/index.scss"
import type { AppProps } from "next/app"
import { QuizAnswersProvider } from "../contexts/quiz"
import Layout from "../components/Layout"
import { ConfirmDialogProvider } from "../contexts/confirmDialog"
import PreviewBanner from "../components/PreviewBanner"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QuizAnswersProvider>
      <ConfirmDialogProvider>
        {pageProps?.showPreviewBanner && <PreviewBanner />}

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ConfirmDialogProvider>
    </QuizAnswersProvider>
  )
}

export default MyApp
