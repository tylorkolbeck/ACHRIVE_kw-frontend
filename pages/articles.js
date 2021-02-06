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
    margin: '20px auto',
    padding: theme.spacing(3)
  },
  articleCategoryList: {
    paddingBottom: theme.spacing(2)
  },
  articleCardWrapper: {
    marginLeft: theme.spacing(1)
    // marginTop: theme.spacing(1)
  },
  categoryLinks: {
    marginRight: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  categoryLinkWrapper: {
    // background: '#0d46a0',
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

  // function handleSearchSelect(event, value) {
  //   // setArticlesState(value)
  // }

  // function filterArticlesHandler(event, value) {
  //   const valueLower = value ? value.toLowerCase() : ''
  //   const filteredArticles = articles.filter((article) => {
  //     return (
  //       article.title.toLowerCase().includes(valueLower) ||
  //       article.description.toLowerCase().includes(valueLower)
  //     )
  //   })
  //   setArticlesState(filteredArticles)
  // }
  return (
    <div>
      <PageHeader title={'Articles'} />
      <Grid container className={classes.root} justify="center" wrap="nowrap">
        {/* <Grid item className={classes.categoryLinks}>
          {categoryState.map((cat) => (
            <Link href={`#${cat}`} key={`category_link_${cat}`}>
              <a>
                <Typography variant="h6" color="secondary">
                  {cat && cat.toUpperCase()}
                </Typography>
              </a>
            </Link>
          ))}
        </Grid> */}
        <Grid item style={{ flexGrow: 1 }}>
          <Grid item style={{ margin: '20px auto' }}>
            <NewsLetterSignup />
          </Grid>
          {/* <Grid item className={classes.searchWrapper}>
            <Autocomplete
              freeSolo
              disableClearable
              options={articleState}
              getOptionLabel={(option) => option.title}
              onChange={handleSearchSelect}
              // onInputChange={filterArticlesHandler}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Articles..."
                  margin="normal"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, type: 'search' }}
                />
              )}
            />
          </Grid> */}
          <Grid item>
            <Grid container>
              <div className={classes.articleCardWrapper}>
                {articleState.map((article, index) => {
                  return (
                    <>
                      <ArticleCard
                        key={article.id}
                        article={article}
                        noCategory
                        category={article?.category}
                        // image={article?.image}
                        description={article.description}
                        authorName={
                          article?.author?.name
                            ? article?.author?.name
                            : 'Faceless Man'
                        }
                      />
                    </>
                  )
                })}
              </div>
              {/* {categoryState.map((cat) => {
                return (
                  <Grid
                    item
                    xs={12}
                    className={classes.articleCategoryList}
                    key={`category_header_${cat}`}
                  >
                    <Link href={`/category/${cat}`}>
                      <a>
                        <div className={classes.categoryLinkWrapper}>
                          <Typography variant="caption" id={cat}>
                            {cat && cat.toUpperCase()}
                          </Typography>
                        </div>
                      </a>
                    </Link>
                  </Grid>
                )
              })} */}
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
