import React from 'react'
import ArticleCard from '../card/articleCard.component'
import Grid from '@material-ui/core/Grid'
import MainArticle from '../mainArticle/mainArticle.component'
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
       return <CategoryCard article={article} key={`article__link__${article.slug}`} />
      })
    }
  })

  // Create a category title for each category
  for(const category in categoryMap) {
    categoryEl.push(
      <>
        <Typography variant='h3' component='h1'>{category}</Typography>
        {categoryMap[category]}
      </>
    )
  }

  return (
    <Grid container spacing={3}>
       <Grid item sm={12} md={7}>
        <MainArticle latestArticle={ latestArticle }/>  
      </Grid>
      <Grid item sm={12} md={5}>
      {lastFourArticles.map((article, i) => {
            return (
              <ArticleCard article={article} key={`article__link__${article.slug}`} />
            )
          })}
      </Grid>
      <Grid item sm={12}>
        {categoryEl}
      </Grid>
      </Grid>
  )
}

export default Articles
