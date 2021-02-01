import React from 'react'
import ArticleCard from '../card/articleCard.component'
import Grid from '@material-ui/core/Grid'
import FeaturedArticle from '../FeaturedArticle/FeaturedArticle.component'
import { Typography } from '@material-ui/core'
import CategoryCard from '../categoryCard/categoryCard.component'

const Articles = ({ articles, categories }) => {
  const latestArticle = articles[0]
  const lastFourArticles = articles.slice(1, 5)
  const categoryMap = {}
  const categoryEl = []

  // Create a CategoryCard for each article in each category
  categories.forEach((category) => {
    if (category.articles.length > 0) {
      categoryMap[category.name] = category.articles.map((article) => {
        return (
          <CategoryCard
            article={article}
            key={`article__link__${article.slug}`}
          />
        )
      })
    }
  })

  // Create a category title for each category
  for (const category in categoryMap) {
    categoryEl.push(
      <div key={category}>
        <Typography variant="h3" component="h1">
          {category}
        </Typography>
        {categoryMap[category]}
      </div>
    )
  }

  return (
    <div style={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs>
          <Typography variant="h6">Featured</Typography>
          <FeaturedArticle article={latestArticle} />
        </Grid>

        <Grid item md={6}>
          <Grid container>
            <Typography variant="h6">Recent</Typography>
            {lastFourArticles.map((article, i) => {
              return (
                <ArticleCard
                  article={article}
                  key={`article__link__${article.slug}`}
                  last={i === 3}
                />
              )
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Articles
