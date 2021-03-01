import {
  Grid,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  Typography,
  Chip
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import React, { useState } from 'react'
import { fetchAPI } from '../lib/api'
import { makeStyles } from '@material-ui/core/styles'
import ArticleCard from '../components/card/articleCard.component'
import NewsLetterSignup from '../components/NewsLetterSignUp/NewsLetterSignUp.component'
import PageHeader from '../components/Typography/PageHeader/PageHeader.component'
import Link from 'next/link'
import TextLink from '../components/Typography/TextLink/TextLink.component'
import SectionHeader from '../components/Typography/SectionHeader/SectionHeader.component'
import { FaRegArrowAltCircleDown } from 'react-icons/fa'

const useStyles = makeStyles((theme) => ({
  root: {
    '& label.Mui-focused': {
      color:
        theme.palette.type === 'light' ? theme.palette.grey[900] : '#ffffff'
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor:
          theme.palette.type === 'light' ? theme.palette.grey[900] : '#ffffff'
      }
    },
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
  },
  searchInput: {
    width: '100%'
  }
}))

export default function Articles({ articles }) {
  const classes = useStyles()
  const [categoryState, setCategoryState] = useState([])
  const [articleState, setArticlesState] = useState([])
  const [search, setSearch] = useState('')
  const [searchResultsFound, setSearchResultsFound] = useState(true)
  const [loading, setLoading] = useState(false)
  const [searchSummaryVisible, setSearchSummaryVisible] = useState(false)
  const [chipLabel, setChipLabel] = useState('')

  React.useEffect(() => {
    renderArticleData(articles)
  }, [articles])

  React.useEffect(() => {
    const categoryData = []

    articles.forEach((article) => {
      const categoryName = article?.category?.name
        ? article?.category?.name
        : 'Misc'
      const categorySlug = article.category.slug

      if (
        !categoryData.some((category) => category.categoryName === categoryName)
      ) {
        categoryData.push({
          categoryName: categoryName,
          categorySlug: categorySlug
        })
      }
    })
    setCategoryState(categoryData)
  }, [])

  const renderArticleData = (articlesData) => {
    const articleData = []

    articlesData.forEach((article) => {
      const categoryName = article?.category?.name
        ? article?.category?.name
        : 'Misc'
      const categorySlug = article.category.slug

      articleData.push({
        ...article,
        category: { name: categoryName, slug: categorySlug }
      })
    })
    setArticlesState(articleData)
  }

  const handleSearchInput = (e) => {
    const input = e.target.value
    setSearch(input)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const searchResults = await fetchAPI(
      `/articles?title_contains=${search}&_sort=publishedAt:DESC`
    )
    if (searchResults.length < 1) {
      setLoading(false)
      setArticlesState([])
      setSearchResultsFound(false)
    } else {
      renderArticleData(searchResults)
      setLoading(false)
      setSearchResultsFound(true)
    }
    setChipLabel(search)
    setSearchSummaryVisible(true)
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    setSearch('')
    setSearchSummaryVisible(false)
    renderArticleData(articles)
    setSearchResultsFound(true)
  }

  return (
    <div>
      <PageHeader
        title="Articles"
        subtitle="Browse articles for insight from our expert chart analysis and predictions"
      />
      <div className={classes.root}>
        <Grid container direction="row" spacing={3}>
          <Grid item xs={12}>
            <form onSubmit={handleFormSubmit}>
              <FormControl variant="outlined" style={{ width: '100%' }}>
                <InputLabel htmlFor="outlined-adornment-password">
                  Search Articles
                </InputLabel>
                <OutlinedInput
                  style={{
                    width: '100%',
                    marginBottom: '20px',
                    maxWidth: '600px'
                  }}
                  className={classes.searchInput}
                  label="Search Articles"
                  id="outlined-adornment-password"
                  type="text"
                  value={search}
                  disabled={loading}
                  onChange={handleSearchInput}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        disabled={loading}
                        onClick={handleFormSubmit}
                        edge="end"
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </form>
          </Grid>
          <Grid item xs={12} sm={12} md={2} className={classes.leftNav}>
            <SectionHeader>Categories</SectionHeader>
            {categoryState.map((category) => (
              <div className={classes.categoryLink} key={category.categoryName}>
                <Link href={`/category/${category.categorySlug}`}>
                  <div>
                    <TextLink>{category.categoryName.toUpperCase()}</TextLink>
                  </div>
                </Link>
              </div>
            ))}
          </Grid>
          {searchResultsFound ? (
            <>
              <Grid item xs={12} sm={12} md={10}>
                {searchSummaryVisible && (
                  <SearchChip
                    chipLabel={chipLabel}
                    length={articleState.length}
                    handleDelete={handleDelete}
                  />
                )}
                <Grid container justify="center" wrap="nowrap">
                  <Grid item style={{ flexGrow: 1 }}>
                    <Grid item>
                      <Grid container>
                        <div className={classes.articleCardWrapper}>
                          {articleState.map((article, index) => {
                            return (
                              <div
                                style={{
                                  marginBottom: '20px',
                                  padding: '10px'
                                }}
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
            </>
          ) : (
            <Grid item>
              {searchSummaryVisible && (
                <SearchChip
                  chipLabel={chipLabel}
                  length={0}
                  handleDelete={handleDelete}
                />
              )}
              <Typography variant="h4">No Results Found</Typography>
              <Typography variant="subtitle1">
                Try searching a different keyword
              </Typography>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  )
}

function SearchChip({ chipLabel, length, handleDelete }) {
  return (
    <Grid
      item
      style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
    >
      <Typography>{`Showing ${length} search result(s) for `}</Typography>
      <Chip
        style={{ marginLeft: '10px' }}
        label={chipLabel}
        onDelete={handleDelete}
        color="secondary"
      />
    </Grid>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel

  const articles = await fetchAPI('/articles?_sort=publishedAt:DESC')
  const authors = await fetchAPI('/writers')

  return {
    props: { articles, authors },
    revalidate: 1
  }
}
