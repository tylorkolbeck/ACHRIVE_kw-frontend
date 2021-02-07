import { Grid, Typography, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { fetchAPI } from '../lib/api'
import { makeStyles } from '@material-ui/core/styles'
import ArticleCard from '../components/card/articleCard.component'
import Link from 'next/link'
import Footer from '../components/Footer/Footer.component'
import Autocomplete from '@material-ui/lab/Autocomplete'
import NewsLetterSignup from '../components/NewsLetterSignUp/NewsLetterSignUp.component'
import PageHeader from '../components/PageHeader/PageHeader.component'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '800px',
    margin: '0px auto',
    padding: theme.spacing(3),
    paddingTop: '0'
  },
  articleCategoryList: {
    paddingBottom: theme.spacing(2)
  },
  articleCardWrapper: {
    marginLeft: theme.spacing(1)
  },
  categoryLinks: {
    marginRight: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  categoryLinkWrapper: {
    display: 'inline-block',
    color: theme.palette.secondary.light,
    padding: '4px 6px',
    borderRadius: '4px',
    '&:hover': {
      cursor: 'pointer',
      background: theme.palette.secondary.light
    }
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
    <div>
      <PageHeader title={'Articles'} />
      <Grid container className={classes.root} justify="center" wrap="nowrap">
        <Grid item style={{ flexGrow: 1 }}>
          <Grid item>
            <Grid container>
              <div className={classes.articleCardWrapper}>
                {articleState.map((article, index) => {
                  return (
                    <React.Fragment key={article.id}>
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
                      {index === 4 && (
                        <Grid item style={{ margin: '50px auto' }}>
                          <NewsLetterSignup />
                        </Grid>
                      )}
                    </React.Fragment>
                  )
                })}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </div>
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
