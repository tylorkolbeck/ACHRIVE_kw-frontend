import App from 'next/app'
import Head from 'next/head'
import Cookie from 'js-cookie'
import '../assets/css/style.css'
import { createContext, useState, useEffect } from 'react'
import AppContext from '../context/AppContext'
import { getStrapiMedia } from '../lib/media'
import { fetchAPI } from '../lib/api'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../styles/theme'

const API_URL =
    process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'

// Store Strapi Global object in context
export const GlobalContext = createContext({})

const MyApp = ({ Component, pageProps }) => {
    const { global } = pageProps
    const [user, setUser] = useState(null)

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles)
        }
    }, [])

    useEffect(() => {
        // grab token value from cookie
        const token = Cookie.get('token')

        if (token) {
            // authenticate the token on the server and place set user object
            fetch(`${API_URL}/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(async (res) => {
                // if res comes back not valid, token is not valid
                // delete the token and log the user out on client
                if (!res.ok) {
                    Cookie.remove('token')
                    setUser(null)
                    return null
                }
                const user = await res.json()
                setUser({ user: user })
            })
        }
    }, [])

    return (
        <>
            <AppContext.Provider
                value={{
                    user: user,
                    isAuthenticated: !!user,
                    setUser: setUser
                }}
            >
                <Head>
                    <link
                        rel="shortcut icon"
                        href={getStrapiMedia(global.favicon)}
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Staatliches"
                    />
                    <link
                        rel="stylesheet"
                        href="https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/css/uikit.min.css"
                    />
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.min.js" />
                    <script src="https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/js/uikit-icons.min.js" />
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.js" />
                </Head>
                <GlobalContext.Provider value={global}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Component {...pageProps} />
                    </ThemeProvider>
                </GlobalContext.Provider>
            </AppContext.Provider>
        </>
    )
}

export default MyApp
