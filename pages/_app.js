import { useEffect, useState } from 'react'
import { UserContextProvider } from '../context/UserContext'
import Layout from '../components/layout/layout.component'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import '../styles/globals.css'
import theme, { setTheme } from '../styles/theme'
import CookieConsent from 'react-cookie-consent'

export default function App({ Component, pageProps }) {
  const [colorMode, setColorMode] = useState('light')
  const [themeState, setThemeState] = useState(theme)
  const [cookieState, setCookieState] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storageTheme = localStorage.getItem('theme')
      if (!storageTheme) {
        localStorage.setItem('theme', 'light')
        setThemeState(setTheme(colorMode))
      } else {
        setThemeState(setTheme(storageTheme))
      }
    }
  }, [colorMode])

  function toggleDarkMode() {
    if (typeof window !== 'undefined') {
      const storageTheme = localStorage.getItem('theme')
      if (storageTheme) {
        localStorage.setItem(
          'theme',
          storageTheme === 'dark' ? 'light' : 'dark'
        )
      } else {
        localStorage.setItem('theme', colorMode === 'dark' ? 'light' : 'dark')
      }
    }
    setColorMode(colorMode === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <link rel="shortcut icon" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Staatliches"
        />
        {cookieState && (
          <>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-7S6NV6Q910"
            ></script>

            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7S6NV6Q910');`
              }}
            ></script>
          </>
        )}
      </Head>

      <CookieConsent
        location="bottom"
        buttonText="OK"
        style={{ background: '#2B373B', zIndex: '100', padding: '25px' }}
        buttonStyle={{
          background: '#0d46a0',
          fontSize: '13px',
          color: 'white'
        }}
        onAccept={() => {
          setCookieState(true)
        }}
      >
        <h2>What do we use cookies for?</h2>
        We use functional tracking to analyse how our website is being used.
        This data helps us to discover errors and develop new designs. It also
        allows us to test the effectiveness of our website. Please support
        Killer Whale Crypto by enabling cookies. You can view our updated{' '}
        <a href="/privacypolicy" style={{ textDecoration: 'underline' }}>
          privacy policy
        </a>{' '}
        and{' '}
        <a href="/cookie-policy" style={{ textDecoration: 'underline' }}>
          cookie policy
        </a>{' '}
      </CookieConsent>
      <UserContextProvider>
        <ThemeProvider theme={themeState}>
          <CssBaseline />
          <Layout toggleDarkMode={toggleDarkMode}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </UserContextProvider>
    </>
  )
}
