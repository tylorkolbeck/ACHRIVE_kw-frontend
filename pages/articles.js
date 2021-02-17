import { Grid } from '@material-ui/core'
import React, { useState } from 'react'
import { fetchAPI } from '../lib/api'
import { makeStyles } from '@material-ui/core/styles'
import ArticleCard from '../components/card/articleCard.component'
import NewsLetterSignup from '../components/NewsLetterSignUp/NewsLetterSignUp.component'
import PageHeader from '../components/Typography/PageHeader/PageHeader.component'
import Link from 'next/link'
import TextLink from '../components/Typography/TextLink/TextLink.component'
import SectionHeader from '../components/Typography/SectionHeader/SectionHeader.component'

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
    marginBottom: theme.spacing(2)
  },

  searchWrapper: {
    marginBottom: theme.spacing(2)
  },
  leftNav: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
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
      <PageHeader
        title="Articles"
        subTitle="Browse articles for insight from our expert chart analysis and predictions"
      />
      <div className={classes.root}>
        <Grid container direction="row" spacing={3}>
          <Grid item xs={12} sm={12} md={2} className={classes.leftNav}>
            <SectionHeader>Categories</SectionHeader>
            {categoryState.map((category) => (
              <div className={classes.categoryLink} key={category}>
                <Link href={`/category/${category}`}>
                  <div>
                    <TextLink>{category.toUpperCase()}</TextLink>
                  </div>
                </Link>
              </div>
            ))}
          </Grid>

          <Grid item xs={12} sm={12} md={10}>
            <Grid container justify="center" wrap="nowrap">
              <Grid item style={{ flexGrow: 1 }}>
                <Grid item>
                  <Grid container>
                    <div className={classes.articleCardWrapper}>
                      {articleState.map((article, index) => {
                        return (
                          <div
                            style={{ marginBottom: '20px', padding: '10px' }}
                            key={article.id}
                          >
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
    revalidate: 1
  }
}
