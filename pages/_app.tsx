import "../styles/index.scss"
import type { AppProps } from "next/app"
import { QuizAnswersProvider } from "../contexts/quiz"
import Layout from "../components/Layout"
import PreviewBanner from "../components/PreviewBanner"
import ConfirmationMessage from "../components/ConfirmationMessage"
import { SWRConfig } from "swr"
import { GoogleAnalytics } from "nextjs-google-analytics"
import Script from "next/script"

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <SWRConfig value={{ fetcher: url => fetch(url).then(res => res.json()) }}>
      <QuizAnswersProvider>
        <GoogleAnalytics trackPageViews />

        <Layout {...pageProps}>
          {pageProps?.showPreviewBanner && <PreviewBanner />}
          <ConfirmationMessage />

          <Component {...pageProps} />
        </Layout>

        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-11119445903" />
        <Script
          id="gtm"
          dangerouslySetInnerHTML={{
            __html: `  window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());  gtag('config', 'AW-11119445903');`,
          }}
        />

        <Script
          id="linkedin"
          dangerouslySetInnerHTML={{
            __html: `_linkedin_partner_id = "4792546"; window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []; window._linkedin_data_partner_ids.push(_linkedin_partner_id);`,
          }}
        />

        <Script
          id="linkedin"
          dangerouslySetInnerHTML={{
            __html: `(function(l) { if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])}; window.lintrk.q=[]} var s = document.getElementsByTagName("script")[0]; var b = document.createElement("script"); b.type = "text/javascript";b.async = true; b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js"; s.parentNode.insertBefore(b, s);})(window.lintrk);`,
          }}
        />

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=4792546&fmt=gif"
          />
        </noscript>
      </QuizAnswersProvider>
    </SWRConfig>
  )
}

export default MyApp
