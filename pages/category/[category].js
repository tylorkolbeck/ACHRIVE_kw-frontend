import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { getAllCategoryNames, getArticlesByCategory } from '../../lib/category'
import ArticleCard from '../../components/card/articleCard.component'
import { fetchAPI } from '../../lib/api'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: theme.custom.screen.maxWidth,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(3)
  },
  title: {
    marginBottom: theme.spacing(3)
  }
}))

export default function Category({ categoryData, authors }) {
  const classes = useStyles()
  const { name, articles } = categoryData

  return (
    <div className={classes.root}>
      <Grid container>
        <Typography variant="h2" className={classes.title}>
          {name.toUpperCase()}
        </Typography>

        <Grid container direction="column">
          {articles.map((article) => {
            const author = authors.find(
              (author) => author.id === article.author
            )
            return (
              <Grid item xs={12} key={article.title}>
                <ArticleCard
                  article={article}
                  authorName={author.name}
                  description={article.description.slice(0, 100) + '...'}
                />
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = await getAllCategoryNames()

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const categoryArticles = await getArticlesByCategory(params.category)
  const authors = await fetchAPI('/writers')
  return {
    props: {
      categoryData: categoryArticles,
      authors: authors
    }
  }
}
