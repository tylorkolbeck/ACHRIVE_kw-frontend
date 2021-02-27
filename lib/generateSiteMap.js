const fs = require('fs')
const globby = require('globby')
const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'

async function generateSiteMap() {
  const pages = await globby([
    'pages/**/*.js',
    'pages/*.js',
    '!pages/_*.js',
    '!pages/**/[slug].js',
    '!pages/**/[category].js',
    '!pages/api'
    // 'posts/*.md'
  ])

  const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${pages
            .map((page) => {
              const path = page.replace('pages', '').replace('.js', '')
              // .replace('.md', '')
              const route = path === '/index' ? '' : path
              return `
                      <url>
                          <loc>${`${API_URL}${route}`}</loc>
                      </url>
                  `
            })
            .join('')}
      </urlset>
  `

  fs.writeFileSync('public/sitemap.xml', sitemap)
}

generateSiteMap()
