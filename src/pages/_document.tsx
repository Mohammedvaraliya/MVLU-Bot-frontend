import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          property="og:title"
          content="MVLU Bot - A chatbot to answer queries regard Sheth L.U.J and Sir M.V College"
        />
        <meta
          property="og:image"
          content="https://mvlubot.netlify.app/open-graph.png"
        />

        <meta
          name="twitter:card"
          content="https://mvlubot.netlify.app/open-graph.png"
        />
        <meta name="twitter:title" content="Sammy the Shark" />
        <meta
          name="twitter:description"
          content="MVLU Bot - A chatbot to answer queries regard Sheth L.U.J and Sir M.V College"
        />
        <meta
          name="twitter:image"
          content="https://mvlubot.netlify.app/open-graph.png"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
