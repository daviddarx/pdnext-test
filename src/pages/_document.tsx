import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='de'>
      <Head>
        <link rel='manifest' href='/manifest.webmanifest' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
