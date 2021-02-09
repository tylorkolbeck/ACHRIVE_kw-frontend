import React from 'react'
import { Grid, Typography, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { getAllCategoryNames, getArticlesByCategory } from '../../lib/category'
import ArticleCard from '../../components/card/articleCard.component'
import { fetchAPI } from '../../lib/api'
import PageHeader from '../../components/PageHeader/PageHeader.component'
import BackButton from '../../components/BackButton/BackButton.component'
import ScrollToTop from '../../components/ScrollToTopButton/ScrollToTopButton.component'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: theme.custom.screen.maxWidth,
    margin: '0 auto',
    padding: theme.spacing(3),
    paddingTop: theme.custom.screen.navBarHeight
  }
}))

export default function Category({ categoryData, authors }) {
  const classes = useStyles()
  const { name, articles } = categoryData

  return (
    <div className={classes.root}>
      <PageHeader title={name?.toUpperCase()} />
      <ScrollToTop />
      <BackButton />
      {/* <Link href="/articles">
        <a>
          <Typography variant="body1">All Categories</Typography>
        </a>
      </Link> */}

      <Grid container direction="column">
        {articles &&
          articles.map((article) => {
            const author = authors.find(
              (author) => author.id === article.author
            )
            return (
              <Grid item xs={12} key={article.title}>
                {/* <ArticleCard
                    article={article}
                    authorName={author.name}
                    description={article.description.slice(0, 100) + '...'}
                  /> */}
                <Paper
                  style={{ padding: '20px', marginBottom: '20px' }}
                  elevation={1}
                >
                  <ArticleCard
                    article={article}
                    noCategory
                    // category={article?.category}
                    image={article?.image}
                    description={article.description}
                    authorName={
                      article?.author?.name
                        ? article?.author?.name
                        : 'Faceless Man'
                    }
                  />
                </Paper>
              </Grid>
            )
          })}
      </Grid>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = await getAllCategoryNames()

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const categoryArticles = await getArticlesByCategory(params.category)
  const authors = await fetchAPI('/writers')
  return {
    props: {
      categoryData: categoryArticles,
      authors: authors
    },
    revalidate: 10
  }
}

Category.defaultProps = {
  categoryData: {},
  authors: []
}
