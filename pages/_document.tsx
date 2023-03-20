import { Html, Head, Main, NextScript } from "next/document"

const Document = () => (
  <Html>
    {/* generic */}
    <title>Now Foster</title>
    <meta
      name="description"
      content="Forget everything you know about fostering"
    />
    {/* twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Now Foster" />
    <meta property="twitter:image" content="/banner.png" />
    <meta
      name="twitter:description"
      content="Forget everything you know about fostering"
    />
    {/* og */}
    <meta property="og:image" content="/banner.png" />

    <Head />
    <body>
      <Main />
      <NextScript />
    </body>

    {/* linkedin */}
    <script type="text/javascript">
      {`_linkedin_partner_id = "4792546";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
</script><script type="text/javascript">
(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);`}
    </script>
    <noscript>
      <img
        height="1"
        width="1"
        style="display:none;"
        alt=""
        src="https://px.ads.linkedin.com/collect/?pid=4792546&fmt=gif"
      />
    </noscript>

    {/* meta */}
    <script>
      {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '838597620972759');
fbq('track', 'PageView');`}
    </script>
    <noscript>
      <img
        height="1"
        width="1"
        style="display:none"
        src="https://www.facebook.com/tr?id=838597620972759&ev=PageView&noscript=1"
      />
    </noscript>
  </Html>
)

export default Document
