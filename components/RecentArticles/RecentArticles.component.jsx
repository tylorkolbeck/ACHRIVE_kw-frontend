import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import ArticleCard from '../../components/card/articleCard.component'

export default function RecentArticles({ articles }) {
  return (
    <Grid container>
      {articles.map((article, i) => {
        return (
          <ArticleCard
            article={article}
            authorName={article?.author?.name}
            key={`article__link__${article.slug}`}
            category={article?.category?.name}
            last={i === 3}
            description={article?.description?.slice(0, 100)}
          />
        )
      })}
    </Grid>
  )
}
