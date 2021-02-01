import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import ArticleCard from '../../components/card/articleCard.component'

export default function RecentArticles({ articles }) {
  return (
    <Grid item md={6}>
      <Grid container>
        <Typography variant="h6">Recent</Typography>
        {articles.map((article, i) => {
          return (
            <ArticleCard
              article={article}
              authorName={article.author.name}
              key={`article__link__${article.slug}`}
              category={article.category.name}
              last={i === 3}
            />
          )
        })}
      </Grid>
    </Grid>
  )
}
