import Link from 'next/link'
import React from 'react'
import Seo from '../components/seo/seo.component'
import { getSortedPostsData } from '../lib/posts'
import { fetchAPI } from '../lib/api'
import BlogFeed from '../containers/blogfeed/blogfeed.container'

const Home = ({ allPostsData, homepage, global, categories }) => {
  return (
    <>
      <Seo seo={homepage.seo} global={global} />
      <BlogFeed articles={allPostsData} categories={categories} />
    </>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [allPostsData, global, homepage, categories] = await Promise.all([
    getSortedPostsData(),
    fetchAPI('/global'),
    fetchAPI('/homepage'),
    fetchAPI('/categories')
  ])

  return {
    props: { allPostsData, homepage, global, categories }
  }
}

export default Home
