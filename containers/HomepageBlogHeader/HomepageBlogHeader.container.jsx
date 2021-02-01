import React from 'react'
import ArticleCard from '../../components/card/articleCard.component'
import Grid from '@material-ui/core/Grid'
import FeaturedArticle from '../../components/FeaturedArticle/FeaturedArticle.component'
import RecentArticles from '../../components/RecentArticles/RecentArticles.component'
import { Typography } from '@material-ui/core'

const Articles = ({ articles }) => {
  const latestArticle = articles[0]
  const lastFourArticles = articles.slice(1, 5)

  return (
    <div style={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs>
          <Typography variant="h6">Featured</Typography>
          <FeaturedArticle article={latestArticle} />
        </Grid>

        <RecentArticles articles={lastFourArticles} />
      </Grid>
    </div>
  )
}

export default Articles
