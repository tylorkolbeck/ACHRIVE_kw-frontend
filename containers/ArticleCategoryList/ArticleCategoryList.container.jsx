import React from 'react'

import Link from 'next/link'
import { Typography, Grid, Divider } from '@material-ui/core'
import ArticleCard from '../../components/card/articleCard.component'

export default function ArticleCategoryList({ categories, limit, authors }) {
  // Create a CategoryCard for each article in each category

  const categoryMap = {}
  const categoryEl = []
  const limitArticles = limit ? limit : 5

  categories.forEach((category) => {
    if (category.articles.length > 0) {
      categoryMap[category.name] = category.articles.map((article, index) => {
        if (limitArticles <= limitArticles) {
          const author = authors.find((author) => author.id === article.author)
          const category = categories.find(
            (category) => category.id === article.category
          )
          return (
            <ArticleCard
              article={article}
              authorName={author.name}
              category={category.name}
              key={`article__link__${article.slug}`}
              strip
            />
          )
        }
      })
    }
  })

  // Create a category title for each category
  for (const category in categoryMap) {
    categoryEl.push(
      <Grid item xs={4} key={category} style={{ minWidth: '360px' }}>
        <div>
          <Link href={`/category/${category}`}>
            <a>
              <Typography variant="h6" color="secondary">
                {category.toUpperCase()}
              </Typography>
            </a>
          </Link>
          {categoryMap[category]}
        </div>
      </Grid>
    )
  }
  return (
    <div style={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {categoryEl}
      </Grid>
    </div>
  )
}
