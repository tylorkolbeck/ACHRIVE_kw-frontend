import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import ArticleCard from '../../components/card/articleCard.component'
import Link from 'next/link'

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
      <Link href="/articles">
        <Button variant="contained" color="secondary">
          View All Articles
        </Button>
      </Link>
    </Grid>
  )
}
