import "../styles/index.scss"
import type { AppProps } from "next/app"
import { QuizAnswersProvider } from "../contexts/quiz"
import Layout from "../components/Layout"
import PreviewBanner from "../components/PreviewBanner"
import ConfirmationMessage from "../components/ConfirmationMessage"
import { SWRConfig } from "swr"
import { AnimatePresence } from "framer-motion"

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <SWRConfig value={{ fetcher: url => fetch(url).then(res => res.json()) }}>
      <QuizAnswersProvider>
        <Layout {...pageProps}>
          {pageProps?.showPreviewBanner && <PreviewBanner />}

          <ConfirmationMessage />

          <AnimatePresence
            exitBeforeEnter
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </Layout>
      </QuizAnswersProvider>
    </SWRConfig>
  )
}

export default MyApp
