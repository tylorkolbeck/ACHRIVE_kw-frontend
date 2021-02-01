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

const CategoryCard = ({ article }) => {
  const classes = useStyles()

  return ( 
    <>
      <Link href={`/article/${article.slug}`}  color='inherit'>
        <a>
        <Grid container spacing={3}>
            <Grid item xs={7}>
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

export default CategoryCard
