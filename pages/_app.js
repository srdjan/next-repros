import Head from 'next/head'
import Navigation from '../components/navigation'

export default function App({ Component, pageProps }) {
  return (
    <>
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
      <Navigation />
      <div className='content'>
        <Component {...pageProps} />
      </div>
    </>
  )
}
