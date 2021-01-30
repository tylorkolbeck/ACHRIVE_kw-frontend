import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'
import theme from '../styles/theme'

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* PWA primary color */}
                    <meta
                        name="theme-color"
                        content={theme.palette.primary.main}
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                </Head>
                <body>
                    <Main pageProps={this.pageProps} />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

// // getInitialProps disables automatic static optimization for pages that don't
// // have getStaticProps. So article, category and home pages still get SSG.
// // Hopefully we can replace this with getStaticProps once this issue is fixed:
// // https://github.com/vercel/next.js/discussions/10949
// MyApp.getInitialProps = async (ctx) => {
//     // Calls page's `getInitialProps` and fills `appProps.pageProps`
//     const appProps = await App.getInitialProps(ctx)
//     // Fetch global site settings from Strapi
//     const global = await fetchAPI('/global')
//     // Pass the data to our page via props
//     return { ...appProps, pageProps: { global } }
// }

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage
    // Calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await Document.getInitialProps(ctx)
    // Fetch global site settings from Strapi
    const global = await fetchAPI('/global')

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
        })

    const initialProps = await Document.getInitialProps(ctx)

    return {
        ...initialProps,
        ...appProps,
        pageProps: { global },
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [
            ...React.Children.toArray(initialProps.styles),
            sheets.getStyleElement()
        ]
    }
}
