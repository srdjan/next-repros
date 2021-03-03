import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html>
        <Head>
          <meta name='theme-color' content='#547599' key='theme-color' />
          <meta name='apple-mobile-web-app-title' content='NextRepro' key='apple-mobile-web-app-title' />
          <meta name='apple-mobile-web-app-capable' content='yes' key='apple-mobile-web-app-capable' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' key='apple-mobile-web-app-status-bar-style' />

          <meta name='application-name' content='NextRepro' key='application-name' />
          <link href='https://unpkg.com/m-@1.2.4/dist/min.css' rel='stylesheet' />
          <script src='https://unpkg.com/m-@1.2.4/dist/min.js' defer />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
