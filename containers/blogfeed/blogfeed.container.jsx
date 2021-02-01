import React from 'react'
import Articles from '../../components/article/article.component'
import styles from './blogfeed.module.scss'

const BlogFeed = ({ articles, categories }) => {

  return (
  <div className={styles.BlogFeed_Container}>
        <Articles articles={articles} categories={categories}/>
  </div>
  )
}

export default BlogFeed
