import { useEffect, useState } from 'react'
import { UserContextProvider } from '../context/UserContext'
import Layout from '../components/layout/layout.component'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import '../styles/globals.css'
import theme, { setTheme } from '../styles/theme'

export default function App({ Component, pageProps }) {
  const [colorMode, setColorMode] = useState('light')
  const [themeState, setThemeState] = useState(theme)

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
      localStorage.setItem('theme', colorMode === 'dark' ? 'light' : 'dark')
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
      </Head>
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
