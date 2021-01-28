import App from 'next/app'
import Head from 'next/head'
import Cookie from "js-cookie"
import '../assets/css/style.css'
import { createContext, useState, useEffect } from 'react'
import AppContext from "../context/AppContext";
import { getStrapiMedia } from '../lib/media'
import { fetchAPI } from '../lib/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

// Store Strapi Global object in context
export const GlobalContext = createContext({})

const MyApp = ({ Component, pageProps }) => {
  const { global } = pageProps
  const [user, setUser] = useState(null);

  useEffect(() => {
      window.addEventListener('beforeunload', Cookie.remove('user'));
    return () => {
      window.removeEventListener('beforeunload', Cookie.remove('user'));
    };
  }, [])

  useEffect(() => {
    // grab token value from cookie
    const token = Cookie.get("token");

    if (token) {
      // authenticate the token on the server and place set user object
      fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        if (!res.ok) {
          Cookie.remove("token");
          setUser(null);
          return null;
        }
        const user = await res.json();
        setUser({user: user});
      });
    }
  }, [])

  return (
    <>
      <AppContext.Provider
        value={{
          user: user,
          isAuthenticated: !!user,
          setUser: setUser,
        }}
      >
      <Head>
        <link rel='shortcut icon' href={getStrapiMedia(global.favicon)} />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Staatliches'
        />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/css/uikit.min.css'
        />
        <script src='https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.min.js' />
        <script src='https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/js/uikit-icons.min.js' />
        <script src='https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.js' />
      </Head>
      <GlobalContext.Provider value={global}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
      </AppContext.Provider>
    </>
  )
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx)
  // Fetch global site settings from Strapi
  const global = await fetchAPI('/global')
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global } }
}

export default MyApp
