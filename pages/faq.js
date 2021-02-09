import React from 'react'
import { fetchAPI } from '../lib/api'
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
  Grid
} from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import ScrollToTopButton from '../components/ScrollToTopButton/ScrollToTopButton.component'
import capitalizeFirstLetter from '../lib/utils'
import PageHeader from '../components/PageHeader/PageHeader.component'
import Footer from '../components/Footer/Footer.component'
import Fuse from 'fuse.js'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.custom.screen.maxWidth,
    margin: '0px auto',
    padding: theme.spacing(3),
    position: 'relative',
    marginBottom: '500px',
    paddingTop: theme.custom.screen.navBarHeight
  },
  catTitle: {
    cursor: 'pointer',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1)
  },
  question: {
    cursor: 'pointer',
    marginLeft: theme.spacing(1),
    color: theme.palette.secondary.light
  },
  expand: {
    color: theme.palette.secondary.light
  },
  questionLink: {
    marginBottom: theme.spacing(1)
  },
  inputWrapper: {
    marginBottom: theme.spacing(3)
  },
  qAndA: {
    marginBottom: '20px',
    '& h6': {
      marginBottom: '10px'
    }
  }
}))

// SEARCH THE ANSWERS AS WELL

export default function Faq({ faqs }) {
  const classes = useStyles()
  const router = useRouter()
  const [faqState, setFaqState] = React.useState([])
  const [faqCategories, setFaqCategories] = React.useState([])

  const [searchInput, setSearchInput] = React.useState('')
  const [searchResults, setSearchResults] = React.useState([])

  const fuse = new Fuse(faqs, {
    keys: ['question', 'answer', 'category.name']
  })

  React.useEffect(() => {
    const cats = []
    const faqData = faqs.map((faq) => {
      const categoryName = faq?.category?.name
        ? faq?.category?.name
        : 'miscellaneous'

      if (!cats.includes(categoryName)) {
        cats.push(categoryName)
      }
      return {
        ...faq,
        expanded: false,
        category: categoryName
      }
    })
    setFaqState(faqData)
    setFaqCategories(cats)
  }, [])

  function toggleFaqOpen(id) {
    const faqArray = faqState.map((q) => {
      if (q.id === id) {
        q.expanded = !q.expanded
        return q
      }
      return q
    })

    setFaqState(faqArray)
  }

  function scrollToCategory(e, faqCat) {
    e.preventDefault()

    router.push(`#category_${faqCat}`)
  }

  function scrollToQuestion(value, id) {
    const faqID = value
    setFaqState(
      faqState.map((q) => {
        if (q.id === faqID) {
          return { ...q, expanded: true }
        }
        return q
      })
    )
    router.push(`#question_${faqID}`)
  }

  function searchInputHandler(e) {
    const input = e.target.value
    console.log(fuse.search(input))
    setSearchResults(fuse.search(input))
    setSearchInput(input)
  }

  return (
    <>
      <div className={classes.root}>
        <PageHeader title="FAQs" />
        <ScrollToTopButton />

        <Grid item>
          <input value={searchInput} onChange={searchInputHandler}></input>
          <div>
            {searchResults &&
              searchResults.map((result) => (
                <div key={result.item.id}>{result.item.question}</div>
              ))}
          </div>
        </Grid>

        {/* Categories and Questions list */}
        {faqCategories.map((faqCat) => (
          <div style={{ marginBottom: '30px' }} key={faqCat}>
            <Typography
              variant="body1"
              className={classes.catTitle}
              onClick={(e) => scrollToCategory(e, faqCat)}
            >
              {capitalizeFirstLetter(faqCat)}
            </Typography>

            <Grid item xs>
              {faqState.map((faq) => {
                if (faq.category === faqCat) {
                  return (
                    <Grid item key={faq.id} className={classes.questionLink}>
                      <Typography
                        className={classes.question}
                        onClick={(e) => scrollToQuestion(faq.id)}
                      >
                        {faq.question}
                      </Typography>
                    </Grid>
                  )
                }
              })}
            </Grid>
          </div>
        ))}
        {/* Category, Questions and collapsable Answers */}
        <List>
          {faqCategories.map((faqCat) => (
            <div key={faqCat}>
              <Typography
                className={classes.catTitle}
                onClick={(e) => scrollToCategory(e, faqCat)}
                variant="body1"
                id={`category_${faqCat}`}
              >
                {/* {capitalizeFirstLetter(faqCat)} */}
              </Typography>
              {faqState &&
                faqState.map((q) => {
                  if (q.category === faqCat)
                    // return (
                    //   <div
                    //     key={q.id}
                    //     className={classes.qAndA}
                    //     id={`question_${q.id}`}
                    //   >
                    //     <Typography variant="h6">{q.question}</Typography>
                    //     <Typography variant="body1">{q.answer}</Typography>
                    //   </div>
                    // )
                    return (
                      <div key={q.id}>
                        <ListItem
                          button
                          onClick={() => toggleFaqOpen(q.id)}
                          id={`question_${q.id}`}
                          key={q.id}
                        >
                          <ListItemText
                            primary={
                              <Typography
                                variant="h5"
                                className={classes.questionListItem}
                              >
                                {q.question}
                              </Typography>
                            }
                          />
                          {q.expanded ? (
                            <ExpandLess className={classes.expand} />
                          ) : (
                            <ExpandMore className={classes.expand} />
                          )}
                        </ListItem>
                        <Collapse in={q.expanded} timeout="auto" unmountOnExit>
                          <ListItem button>
                            <ListItemText primary={q.answer} />
                          </ListItem>
                        </Collapse>
                      </div>
                    )
                })}
            </div>
          ))}
        </List>
      </div>
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const faqs = await fetchAPI('/fa-qs')

  return {
    props: { faqs },
    revalidate: 10
  }
}
