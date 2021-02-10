import { Grid, Paper, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { fetchAPI } from '../lib/api'
import { makeStyles } from '@material-ui/core/styles'
import ArticleCard from '../components/card/articleCard.component'
import Footer from '../components/Footer/Footer.component'
import NewsLetterSignup from '../components/NewsLetterSignUp/NewsLetterSignUp.component'
import PageHeader from '../components/PageHeader/PageHeader.component'
import ScrollToTopButton from '../components/ScrollToTopButton/ScrollToTopButton.component'
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.custom.screen.maxWidth,
    margin: '0px auto',
    padding: theme.spacing(3),
    paddingTop: theme.custom.screen.navBarHeight
  },
  articleCategoryList: {
    paddingBottom: theme.spacing(2)
  },
  articleCardWrapper: {
    marginLeft: theme.spacing(1)
  },
  categoryLink: {
    color: theme.palette.secondary.light,
    marginBottom: theme.spacing(1)
  },

  searchWrapper: {
    marginBottom: theme.spacing(2)
  }
}))

export default function Articles({ articles }) {
  const classes = useStyles()
  const [categoryState, setCategoryState] = useState([])
  const [articleState, setArticlesState] = useState([])

  React.useEffect(() => {
    const categoryData = []
    const articleData = []

    articles.forEach((article) => {
      const categoryName = article?.category?.name
        ? article?.category?.name
        : 'Misc'
      if (!categoryData.includes(categoryName)) {
        categoryData.push(categoryName)
      }
      articleData.push({
        ...article,
        category: categoryName
      })
    })
    setArticlesState(articleData)
    setCategoryState(categoryData)
  }, [articles])
  return (
    <>
      <div className={classes.root}>
        <ScrollToTopButton />
        <PageHeader title={'Articles'} />

        <Grid container direction="row" wrap="nowrap" spacing={3}>
          <Grid item xs>
            <Typography variant="h5" style={{ marginBottom: '20px' }}>
              Categories
            </Typography>
            {categoryState.map((category) => (
              <Link href={`/category/${category}`}>
                <a>
                  <Typography className={classes.categoryLink}>
                    {category.toUpperCase()}
                  </Typography>
                </a>
              </Link>
            ))}
          </Grid>
          <Grid item>
            <Grid container justify="center" wrap="nowrap">
              <Grid item style={{ flexGrow: 1 }}>
                <Grid item>
                  <Grid container>
                    <div className={classes.articleCardWrapper}>
                      {articleState.map((article, index) => {
                        return (
                          <div
                            style={{ marginBottom: '20px', padding: '10px' }}
                          >
                            {/* <Paper
                              style={{ padding: '20px', marginBottom: '20px' }}
                              elevation={1}
                              key={article.card}
                            > */}
                            <ArticleCard
                              article={article}
                              noCategory
                              category={article?.category}
                              image={article?.image}
                              description={article.description}
                              authorName={
                                article?.author?.name
                                  ? article?.author?.name
                                  : 'Faceless Man'
                              }
                            />
                            {/* </Paper> */}
                            {index === 4 && (
                              <Grid item style={{ margin: '50px auto' }}>
                                <NewsLetterSignup />
                              </Grid>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel

  const articles = await fetchAPI(
    '/articles?_sort=published_at:DESC&_limit=100'
  )
  const authors = await fetchAPI('/writers')

  return {
    props: { articles, authors },
    revalidate: 10
  }
}
