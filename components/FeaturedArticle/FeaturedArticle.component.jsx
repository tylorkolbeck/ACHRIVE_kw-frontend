import React from 'react'
import Image from '../image/image.component'
import { Typography, Grid } from '@material-ui/core'
import AuthorInfo from '../AuthorInfo/AuthorInfo.component'
import Link from 'next/link'

const MainArticle = ({ article }) => {
  const imgStyles = {
    objectFit: 'cover',
    maxWidth: '100%',
    overFlow: 'hidden',
    position: 'relative',
    display: 'inline-block',
    width: '100%',
    height: '300px'
  }

  return (
    <Grid container direction="column" style={{ height: '100%' }}>
      <Grid item>
        <div>
          <Image style={imgStyles} image={article.image} />
        </div>
      </Grid>
      <Grid item>
        <Link href={`/article/${article.slug}`}>
          <a>
            <Typography variant="h3" component="h1">
              {article.title}
            </Typography>
          </a>
        </Link>
        <AuthorInfo
          published={article.published_at}
          updated={article.updated_at}
          author={article.author}
        />
      </Grid>
    </Grid>
  )
}

export default MainArticle
