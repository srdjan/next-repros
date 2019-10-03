import * as React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import Navigation from '../components/navigation'
import { Provider, store } from '../services/store'
/*  */
export default class MyApp extends App {
  constructor (props) {
    super(props)

    this.state = {
      purchasedTickets: [],
      ownTicketsBids: 0,
      showPromptModal: false
    }
  }

  promptEvent = null

  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

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
            href='/static/images/K-192.png'
            media='(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)'
          />
          <link
            rel='apple-touch-startup-image'
            href='/static/images/K-192.png'
            media='(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)'
          />
          <link rel='apple-touch-icon' href='/static/images/K-192.png' />
          <link
            rel='apple-touch-icon'
            sizes='152x152'
            href='/static/images/K-152.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/static/images/K-180.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='167x167'
            href='/static/images/K-167.png'
          />
          <meta name='application-name' content='PWA' />
          <link rel='manifest' href='/static/manifest.json' />

          {/* Logo and favicon */}
          <link rel='shortcut icon' href='/static/favicon.ico' />
          <link
            rel='mask-icon'
            href='/static/favicon-mask.svg'
            color='#49B882'
          />
          <link rel='icon' href='/static/favicon.ico' />
          {/* Font preload */}
          <link
            rel='preload'
            href='/static/font/quicksand-latin.woff2'
            as='font'
            type='font/woff2'
          />
          <link
            rel='preload'
            href='/static/font/quicksand-latin-ext.woff2'
            as='font'
            type='font/woff2'
          />

          {/* Firestore preconnect */}
          <link rel='preconnect' href='https://firestore.googleapis.com' />
          <link rel='dns-prefetch' href='https://firestore.googleapis.com' />

          {/* Apple/Mobile meta */}
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='HandheldFriendly' content='true' />
          <meta name='MobileOptimized' content='320' />
        </Head>
        <Navigation
          purchasedTicketsNumber={this.state.purchasedTickets}
          ownTicketsBids={this.state.ownTicketsBids}
          store={store}
        />
        <div className='content'>
          <Provider>
            <Container>
              <Component {...pageProps} store={store} />
            </Container>
          </Provider>
        </div>
        {showPromptModal && (
          <div className='home-screen'>
            <div className='home-screen-row'>
              <img
                className='home-screen-logo'
                alt='PWA Logo'
                title='PWA'
                src='/static/images/PWA-192.png'
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
          html {
            height: 100%;
            margin: 0 auto;
            max-width: 30em;
            font-family: 'Quicksand', sans-serif;
          }
          body {
            box-sizing: border-box; /* reset: more intuitive sizing */
            margin: 0;
            height: 100%;
            overflow-scrolling: touch;
            background: #f1f1f1;
          }
          .content {
            padding-top: 45px;
          }
          *,
          ::before,
          ::after {
            box-sizing: inherit; /* reset: box sizing */
          }
          i,
          cite,
          em,
          var,
          dfn,
          address {
            font-style: normal; /* reset: prevent faux italic */
          }
          b,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          strong,
          th {
            font-weight: normal; /* reset: prevent faux bold */
          }
          [hidden] {
            display: none !important; /* reset: enforce accessible semantics */
          }
        `}</style>
      </React.Fragment>
    )
  }
}
