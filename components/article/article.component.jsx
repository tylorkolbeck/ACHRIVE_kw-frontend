import React from 'react'
import Card from '../card/card.component'
import Grid from '@material-ui/core/Grid'
import MainArticle from '../mainArticle/mainArticle.component'
import { Typography } from '@material-ui/core'

const Articles = ({ articles, categories }) => {
 const latestArticle = articles[0]
 const lastFourArticles = articles.slice(1, 5)
 const natureArticles = categories.filter((category) => {
  return category.name === 'nature'
})

  return (
    <Grid container spacing={3}>
       <Grid item sm={12} md={7}>
        <MainArticle latestArticle={ latestArticle }/>  
      </Grid>
      <Grid item sm={12} md={5}>
      {lastFourArticles.map((article, i) => {
            return (
              <Card article={article} key={`article__link__${article.slug}`} />
            )
          })}
      </Grid>
      <Grid item sm={12}>
        <Typography variant='h3' component='h1'>Nature</Typography>
      {natureArticles.map((article, i) => {
            return (
              <Card article={article.articles[i]} key={`article__link__${article.slug}`} />
            )
          })}
      </Grid>
      </Grid>
  )
}

export default Articles
