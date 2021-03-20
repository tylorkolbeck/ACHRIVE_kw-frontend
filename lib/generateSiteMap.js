const fs = require('fs')
const globby = require('globby')
const getDate = new Date().toISOString()
const API_URL = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}`
const FRONTEND_URL = 'https://www.killerwhalecrypto.com'

const fetchDynamicPostSlugs = async (postType) => {
  const response = await fetch(`${API_URL}/${postType}`)
  const postData = await response.json()
  const postSlugs = postData.map((post) => post.slug)
  const dynamicRoutes = postSlugs
    .map((slug) => {
      return `
              <url>
                  <loc>${`${FRONTEND_URL}/${postType}/${slug}`}</loc>
                  <lastmod>${getDate}</lastmod>
              </url>
          `
    })
    .join('')

  return dynamicRoutes
}

async function generateSiteMap() {
  const pages = await globby([
    'pages/**/*.js',
    'pages/*.js',
    '!pages/**/[slug].js',
    '!pages/**/[category].js',
    '!pages/_*.js',
    '!pages/api'
  ])

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${pages
            .map((page) => {
              const path = page.replace('pages', '').replace('.js', '')
              const route = path === '/index' ? '' : path
              return `
                      <url>
                          <loc>${`${FRONTEND_URL}${route}`}</loc>
                          <lastmod>${getDate}</lastmod>
                      </url>
                  `
            })
            .join('')}
            ${await fetchDynamicPostSlugs('articles')}
            ${await fetchDynamicPostSlugs('categories')}
            ${await fetchDynamicPostSlugs('videos')}
            ${await fetchDynamicPostSlugs('products')}
      </urlset>
  `

  fs.writeFileSync('public/sitemap.xml', sitemap)
}

generateSiteMap()
