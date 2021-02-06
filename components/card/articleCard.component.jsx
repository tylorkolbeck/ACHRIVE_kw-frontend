import React from 'react'
import Image from '../image/image.component'
import { Grid, Typography, Divider, Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import { DateTime } from 'luxon'
import { getStrapiMedia } from '../../lib/media'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(1),

    '& a': {
      color: theme.palette.secondary.dark,
      '&:hover': {
        cursor: 'pointer',
        color: 'black'
      }
    }
  },
  authorFooter: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    fontWeight: '400'
  },
  chip: {
    borderRadius: '2px',
    background: theme.palette.secondary.main,
    color: 'white'
  },
  image: {
    height: '200px',

    width: '250px',
    marginRight: theme.spacing(2),
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  }
}))

const ArticleCard = ({
  article,
  image,
  authorName,
  category,
  noCategory,
  description
}) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.root}>
      {image && (
        <Grid
          item
          className={classes.image}
          style={{ backgroundImage: `url(${getStrapiMedia(image)})` }}
        ></Grid>
      )}
      <Grid item>
        <Link href={`/article/${article.slug}`}>
          <a>
            <Typography
              variant="h6"
              className={classes.title}
              style={{ marginBottom: '5px' }}
            >
              {article.title}
            </Typography>
          </a>
        </Link>
        <Typography variant="body2" style={{ marginBottom: '10px' }}>
          {description}
        </Typography>
        {!!noCategory && (
          <Typography variant="caption">
            {authorName} &#8226;{' '}
            {DateTime.fromISO(article?.published_at).toLocaleString(
              DateTime.DATE_MED
            )}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} className={classes.authorFooter}>
        {!noCategory && category && (
          <Link href={`/category/${category}`}>
            <Chip label={category} size="small" className={classes.chip} />
          </Link>
        )}
        {!noCategory && (
          <Typography variant="caption">
            {authorName} &#8226;{' '}
            {DateTime.fromISO(article?.published_at).toLocaleString(
              DateTime.DATE_MED
            )}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} style={{ marginTop: '20px' }}>
        <Divider />
      </Grid>
    </Grid>
  )
}

export default ArticleCard
