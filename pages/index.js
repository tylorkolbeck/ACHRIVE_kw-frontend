import Link from 'next/link'
import React from 'react'
import Seo from '../components/seo/seo.component'
import { getSortedPostsData } from '../lib/posts'
import { fetchAPI } from '../lib/api'
import BlogFeed from '../containers/blogfeed/blogfeed'

const Home = ({ allPostsData, homepage, global }) => {
  return (
    <>
      <Seo seo={homepage.seo} global={global} />
      <BlogFeed articles={articles} categories={categories} />
    </>
  )
}

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData()

  const global = await fetchAPI('/global')
  const homepage = await fetchAPI('/homepage')

  // Run API calls in parallel

  // const [articles, categories, homepage] = await Promise.all([
  //   fetchAPI('/articles'),
  //   fetchAPI('/categories'),
  //   fetchAPI('/homepage')
  // ])

  return {
    props: { allPostsData, homepage, global }
  }
}

export default Home
