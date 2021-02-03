import React from 'react'
import Seo from '../components/seo/seo.component'
import { getSortedPostsData } from '../lib/posts'
import { fetchAPI } from '../lib/api'
import { makeStyles } from '@material-ui/core/styles'
import HomepageBlogHeader from '../containers/HomepageBlogHeader/HomepageBlogHeader.container'
import ArticleCategoryList from '../containers/ArticleCategoryList/ArticleCategoryList.container'
import { Divider } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.custom.screen.maxWidthHome,
    margin: '20px auto',
    padding: theme.spacing(2)
  }
}))

const Home = ({ allPostsData, homepage, global, categories, authors }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Seo seo={homepage.seo} global={global} />
      <HomepageBlogHeader articles={allPostsData} />
      <Divider style={{ margin: '20px' }} />
      <div style={{ marginTop: '50px' }}>
        <ArticleCategoryList categories={categories} authors={authors} />
      </div>
    </div>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [
    allPostsData,
    global,
    homepage,
    categories,
    authors
  ] = await Promise.all([
    getSortedPostsData(5),
    fetchAPI('/global'),
    fetchAPI('/homepage'),
    fetchAPI('/categories'),
    fetchAPI('/writers')
  ])

  return {
    props: { allPostsData, homepage, global, categories, authors },
    revalidate: 10
  }
}

export default Home
