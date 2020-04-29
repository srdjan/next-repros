import * as React from 'react'
import App from 'next/app'
import Head from 'next/head'
import Navigation from '../components/navigation'
import { store } from '../model/store'

export default class MyApp extends App {
  constructor (props) {
    super(props)

    this.state = {
      showPromptModal: false
    }
  }

  promptEvent = null

  async componentDidMount () {
    if ('serviceWorker' in navigator) {
      try {
        const res = await navigator.serviceWorker.register('/service-worker.js')
        console.log('Service worker registration successful', res)
      } catch (e) {
        console.log('Service worker registration failed', e.message)
      }
    }

    window.addEventListener('beforeinstallprompt', e => {
      console.log('stored event - time for modal')
      e.preventDefault()
      this.promptEvent = e
      this.toggleModal()
    })
  }

  installApp = () => {
    this.promptEvent.prompt()
    this.promptEvent.userChoice.then(res => {
      if (res.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt')
      } else {
        console.log('User dismissed the A2HS prompt')
      }
      this.closeModal()
    })
  }

  closeModal = () => {
    this.promptEvent = null
    this.toggleModal()
  }

  toggleModal = () =>
    this.setState({ showPromptModal: !this.state.showPromptModal })

  render () {
    const { showPromptModal } = this.state
    const { Component, pageProps } = this.props
    return (
      <React.Fragment>
        <Head>
          <title>PWA Kickoff</title>
          <meta name='description' content='PWA - ticket marketplace' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
          <meta name='theme-color' content='#547599' />
          <meta name='apple-mobile-web-app-title' content='PWA' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta
            name='apple-mobile-web-app-status-bar-style'
            content='default'
          />
          <link
            rel='apple-touch-startup-image'
            href='/public/images/K-192.png'
            media='(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)'
          />
          <link
            rel='apple-touch-startup-image'
            href='/public/images/K-192.png'
            media='(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)'
          />
          <link rel='apple-touch-icon' href='/public/images/K-192.png' />
          <link
            rel='apple-touch-icon'
            sizes='152x152'
            href='/public/images/K-152.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/public/images/K-180.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='167x167'
            href='/public/images/K-167.png'
          />
          <meta name='application-name' content='PWA' />
          <link rel='manifest' href='/public/manifest.json' />

          {/* Logo and favicon */}
          <link rel='shortcut icon' href='/public/favicon.ico' />
          <link
            rel='mask-icon'
            href='/public/favicon-mask.svg'
            color='#49B882'
          />
          <link rel='icon' href='/public/favicon.ico' />
          {/* Font preload */}
          <link
            rel='preload'
            href='/public/font/quicksand-latin.woff2'
            as='font'
            type='font/woff2'
          />
          <link
            rel='preload'
            href='/public/font/quicksand-latin-ext.woff2'
            as='font'
            type='font/woff2'
          />
        </Head>
        <Navigation store={store} />
        <div className='content'>
          <Component {...pageProps} store={store} />
        </div>
        {showPromptModal && (
          <div className='home-screen'>
            <div className='home-screen-row'>
              <img
                className='home-screen-logo'
                alt='PWA Logo'
                title='PWA'
                src='/public/images/PWA-192.png'
              />
              <div>
                <h2 className='home-screen-title'>PWA</h2>
                <h4 className='home-screen-link'>PWA.app</h4>
              </div>
            </div>
            <button onClick={this.installApp}>Install App</button>
          </div>
        )}
        <style jsx global>{`
          /*!
          * Writ v1.0.4
          *
          * Copyright © 2015, Curtis McEnroe <curtis@cmcenroe.me>
          *
          * https://cmcenroe.me/writ/LICENSE (ISC)
          */

          /* Fonts, sizes & vertical rhythm */

          html {
            font-family: Palatino, Georgia, Lucida Bright, Book Antiqua, serif;
            font-size: 16px;
            line-height: 1.5rem;
          }

          code,
          pre,
          samp,
          kbd {
            font-family: Consolas, Liberation Mono, Menlo, Courier, monospace;
            font-size: 0.833rem;
          }

          kbd {
            font-weight: bold;
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          th {
            font-weight: normal;
          }

          /* Minor third */
          h1 {
            font-size: 2.488em;
          }
          h2 {
            font-size: 2.074em;
          }
          h3 {
            font-size: 1.728em;
          }
          h4 {
            font-size: 1.44em;
          }
          h5 {
            font-size: 1.2em;
          }
          h6 {
            font-size: 1em;
          }
          small {
            font-size: 0.833em;
          }

          h1,
          h2,
          h3 {
            line-height: 3rem;
          }

          p,
          ul,
          ol,
          dl,
          table,
          blockquote,
          pre,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            margin: 1.5rem 0 0;
          }
          ul ul,
          ol ol,
          ul ol,
          ol ul {
            margin: 0;
          }

          hr {
            margin: 0;
            border: none;
            padding: 1.5rem 0 0;
          }

          /* Accounting for borders */
          table {
            line-height: calc(1.5rem - 1px);
            margin-bottom: -1px;
          }
          pre {
            margin-top: calc(1.5rem - 1px);
            margin-bottom: -1px;
          }

          /* Colors */

          body {
            color: #222;
          }
          code,
          pre,
          samp,
          kbd {
            color: #111;
          }
          a,
          header nav a:visited,
          a code {
            color: #00e;
          }
          a:visited,
          a:visited code {
            color: #60b;
          }
          mark {
            color: inherit;
          }

          code,
          pre,
          samp,
          thead,
          tfoot {
            background-color: rgba(0, 0, 0, 0.05);
          }
          mark {
            background-color: #fe0;
          }

          main aside,
          blockquote,
          ins {
            border: solid rgba(0, 0, 0, 0.05);
          }
          pre,
          code,
          samp {
            border: solid rgba(0, 0, 0, 0.1);
          }
          th,
          td {
            border: solid #dbdbdb;
          }

          /* Layout */

          body {
            margin: 1.5rem 1ch;
          }

          body > header {
            text-align: center;
          }

          main,
          body > footer {
            display: block; /* Just in case */
            max-width: 78ch;
            margin: auto;
          }

          main figure,
          main aside {
            float: right;
            margin: 1.5rem 0 0 1ch;
          }

          main aside {
            max-width: 26ch;
            border-width: 0 0 0 0.5ch;
            padding: 0 0 0 0.5ch;
          }

          /* Copy blocks */

          blockquote {
            margin-right: 3ch;
            margin-left: 1.5ch;
            border-width: 0 0 0 0.5ch;
            padding: 0 0 0 1ch;
          }

          pre {
            border-width: 1px;
            border-radius: 2px;
            padding: 0 0.5ch;
            overflow-x: auto;
          }
          pre code {
            border: none;
            padding: 0;
            background-color: transparent;
            white-space: inherit;
          }

          img {
            max-width: 100%;
          }

          /* Lists */

          ul,
          ol,
          dd {
            padding: 0 0 0 3ch;
          }
          dd {
            margin: 0;
          }

          ul > li {
            list-style-type: disc;
          }
          li ul > li {
            list-style-type: circle;
          }
          li li ul > li {
            list-style-type: square;
          }

          ol > li {
            list-style-type: decimal;
          }
          li ol > li {
            list-style-type: lower-roman;
          }
          li li ol > li {
            list-style-type: lower-alpha;
          }

          nav ul {
            padding: 0;
            list-style-type: none;
          }
          nav ul li {
            display: inline;
            padding-left: 1ch;
            white-space: nowrap;
          }
          nav ul li:first-child {
            padding-left: 0;
          }

          /* Tables */

          table {
            width: 100%;
            border-collapse: collapse;
            overflow-x: auto;
          }

          th,
          td {
            border-width: 1px;
            padding: 0 0.5ch;
          }

          /* Copy inline */

          a {
            text-decoration: none;
          }

          sup,
          sub {
            font-size: 0.75em;
            line-height: 1em;
          }

          ins {
            border-width: 1px;
            padding: 1px;
            text-decoration: none;
          }

          mark {
            padding: 1px;
          }

          code,
          samp {
            border-width: 1px;
            border-radius: 2px;
            padding: 0.1em 0.2em;
            white-space: nowrap;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
