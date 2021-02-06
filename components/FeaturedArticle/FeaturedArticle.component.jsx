import React from 'react'
import Image from '../image/image.component'
import { Typography, Grid } from '@material-ui/core'
import AuthorInfo from '../AuthorInfo/AuthorInfo.component'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import { getStrapiMedia } from '../../lib/media'
import { DateTime } from 'luxon'

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(3)
    '& a': {
      color: theme.palette.secondary.dark,
      '&:hover': {
        cursor: 'pointer',
        color: 'black'
      }
    }
  },
  imageContainer: {
    flexGrow: 1,
    width: 'auto',
    flexGrow: 1,
    height: '24vw',
    width: '100%',
    backgroundImage: (article) => {
      return `url(${getStrapiMedia(article.image)})`
    },
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }
}))

const MainArticle = ({ article }) => {
  const classes = useStyles(article)

  return (
    <Grid container direction="column" className={classes.root}>
      {/* <Grid item>
        <Typography variant="h5" style={{ marginBottom: '20px' }}>
          Latest Article
        </Typography>
      </Grid> */}
      <Grid item>
        <Grid container className={classes.imageContainer}></Grid>

        <Link href={`/article/${article.slug}`}>
          <a>
            <Typography
              variant="h4"
              component="h2"
              style={{ marginBottom: '5px', marginTop: '20px' }}
            >
              {article.title}
            </Typography>
          </a>
        </Link>
        {/* <AuthorInfo
          published={article.published_at}
          updated={article.updated_at}
          author={article.author}
        /> */}
      </Grid>
      <Grid item style={{ marginBottom: '20px' }}>
        <Typography variant="caption">{article?.author?.name} </Typography>
        <Typography variant="caption" style={{ color: 'grey' }}>
          &#8226;{' '}
          {DateTime.fromISO(article.published_at).toLocaleString(
            DateTime.DATE_MED
          )}
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="body1" color="initial">
          {article.description.slice(100)}...
          <Link href={`/article/${article.slug}`}>
            <a>Read More</a>
          </Link>
        </Typography>
      </Grid>
    </Grid>
  )
}

export default MainArticle
