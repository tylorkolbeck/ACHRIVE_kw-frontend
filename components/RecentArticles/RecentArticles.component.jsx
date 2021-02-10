import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import ArticleCard from '../../components/card/articleCard.component'
import Link from 'next/link'

export default function RecentArticles({ articles }) {
  return (
    <Grid container style={{ flexGrow: 1 }}>
      {articles.map((article, i) => {
        return (
          <div style={{ marginBottom: '20px' }} key={article.id}>
            <ArticleCard
              article={article}
              authorName={article?.author?.name}
              key={`article__link__${article.slug}`}
              category={article?.category?.name}
              last={i === 3}
              description={article?.description?.slice(0, 100)}
            />
          </div>
        )
      })}
      <Grid item xs={12} style={{ marginTop: '10px' }}>
        <Link href="/articles">
          <a>
            <Typography color="secondary">View All Articles</Typography>
          </a>
          {/* <Button
            variant="contained"
            color="secondary"
            style={{ width: '100%' }}
          >
            View All Articles
          </Button> */}
        </Link>
      </Grid>
    </Grid>
  )
}
