import { useEffect } from 'react'
import { UserContextProvider } from '../context/UserContext'
import Layout from '../components/layout/layout.component'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
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
        {/* <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/css/uikit.min.css"
        /> */}
        {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.min.js" />
        <script src="https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/js/uikit-icons.min.js" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.js" /> */}
      </Head>
      <UserContextProvider>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContextProvider>
    </>
  )
}
