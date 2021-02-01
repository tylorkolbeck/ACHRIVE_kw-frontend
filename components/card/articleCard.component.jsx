import React from 'react'
import Image from '../image/image.component'
import { Grid, Typography, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'

const useStyles = makeStyles(() => ({
  cardTitle: {
    fontWeight: 'bold'
  }
}))

const ArticleCard = ({ article }) => {
  const classes = useStyles()
  const imgStyles = {maxWidth: '100%', objectFit: 'cover'}
  return (
    <>
      <Link href={`/article/${article.slug}`}  color='inherit'>
        <a>
        <Grid container spacing={3}>
            <Grid item xs={5}>
                <Image style={imgStyles} image={article.image} />
            </Grid>
            <Grid item xs={7}>
              <Typography>{article.category.name}</Typography>
              <Typography className={classes.cardTitle}>{article.title}</Typography>
              <Typography>{article.author.name}</Typography>
            </Grid>
            {/* <Grid item xs={12}> */}
            {/* </Grid> */}
          </Grid>
              <Divider />
            </a>
      </Link>
    </>
  )
}

export default ArticleCard
