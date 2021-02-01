import React from 'react'
import Articles from '../../components/article/article.component'
import Grid from '@material-ui/core/Grid'

const BlogFeed = ({ articles, categories }) => {

  return (
  <div>
    <Grid container spacing={3}>
    
        <Articles articles={articles} categories={categories}/>
      
    </Grid>
  </div>
  )
}

export default BlogFeed
