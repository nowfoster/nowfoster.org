import "../styles/index.scss"
import type { AppProps } from "next/app"
import { QuizAnswersProvider } from "../contexts/quiz"
import Layout from "../components/Layout"
import PreviewBanner from "../components/PreviewBanner"
import ConfirmationMessage from "../components/ConfirmationMessage"
import { SWRConfig } from "swr"
import { AnimatePresence, motion } from "framer-motion"

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <SWRConfig value={{ fetcher: url => fetch(url).then(res => res.json()) }}>
      <QuizAnswersProvider>
        <Layout {...pageProps}>
          {pageProps?.showPreviewBanner && <PreviewBanner />}

          <ConfirmationMessage />

          <Component {...pageProps} />
        </Layout>
      </QuizAnswersProvider>
    </SWRConfig>
  )
}

export default MyApp
