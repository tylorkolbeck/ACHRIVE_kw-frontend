import React from 'react'
import ArticleCard from '../card/card.component'
import Grid from '@material-ui/core/Grid'
import MainArticle from '../mainArticle/mainArticle.component'
import { Typography } from '@material-ui/core'
import CategoryCard from '../categoryCard/categoryCard.component'

const Articles = ({ articles, categories }) => {
 
 const latestArticle = articles[0]
 const lastFourArticles = articles.slice(1, 5)
 const natureArticles = categories.filter((category) => {
  return category.name === 'nature'
})
const categoryMap = {}
const categoryEl = []
 categories.forEach((category) => {
  if (category.articles.length > 0) {
     
    categoryMap[category.name] = category.articles.map((article) => {
        
       return <ArticleCard article={article} key={`article__link__${article.slug}`} />
   
      })
    }
  })
  console.log(categoryMap);
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
