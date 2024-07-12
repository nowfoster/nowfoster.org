import "../styles/index.scss";
import type { AppProps } from "next/app";
import { QuizAnswersProvider } from "../contexts/quiz";
import Layout from "../components/Layout";
import PreviewBanner from "../components/PreviewBanner";
import ConfirmationMessage from "../components/ConfirmationMessage";
import { SWRConfig } from "swr";
import { GoogleAnalytics } from "nextjs-google-analytics";
import Script from "next/script";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <SWRConfig
      value={{ fetcher: (url) => fetch(url).then((res) => res.json()) }}
    >
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
          id="meta"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '1926975454354181');
      fbq('track', 'PageView');`,
          }}
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=1926975454354181&ev=PageView&noscript=1" />`,
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
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
  );
}

export default MyApp;
