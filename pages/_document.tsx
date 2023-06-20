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
  </Html>
)

export default Document
