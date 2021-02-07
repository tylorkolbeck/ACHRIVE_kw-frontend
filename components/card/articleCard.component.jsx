import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import { DateTime } from 'luxon'
import { getStrapiMedia } from '../../lib/media'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(3),

    '& a': {
      '&:hover': {
        cursor: 'pointer',
        color: theme.palette.secondary.main
      }
    }
  },
  authorFooter: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    fontWeight: '600'
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
    backgroundSize: 'cover',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      display: 'none'
    }
  },
  description: {
    color: '405379',
    fontWeight: '400'
  },
  categoryName: {
    color: theme.palette.secondary.light
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
    <Grid container className={classes.root} direction="row">
      {image && (
        <Grid
          item
          className={classes.image}
          style={{ backgroundImage: `url(${getStrapiMedia(image)})` }}
        ></Grid>
      )}

      <Grid item xs>
        <Grid container direction="column">
          <Grid item>
            <Link href={`/category/${category}`}>
              <a>
                <Typography variant="caption" className={classes.categoryName}>
                  {category && category.toUpperCase()}
                </Typography>
              </a>
            </Link>
          </Grid>
          <Link href={`/article/${article.slug}`}>
            <a>
              <Typography
                variant="h5"
                className={classes.title}
                style={{ marginBottom: '5px' }}
              >
                {article.title}
              </Typography>
            </a>
          </Link>
          <Typography
            variant="body2"
            className={classes.description}
            style={{ marginBottom: '10px' }}
          >
            {description.slice(0, 250)}
          </Typography>

          {!!noCategory && (
            <Typography variant="caption" style={{ fontWeight: 'bold' }}>
              {authorName} &#8226;{' '}
              {DateTime.fromISO(article?.published_at).toLocaleString(
                DateTime.DATE_MED
              )}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.authorFooter}>
        {/* {!noCategory && category && (
          <Link href={`/category/${category}`}>
            <Chip label={category} size="small" className={classes.chip} />
          </Link>
        )} */}
        {!noCategory && (
          <Typography variant="caption" style={{ fontWeight: 'bold' }}>
            {authorName} &#8226;{' '}
            {DateTime.fromISO(article?.published_at).toLocaleString(
              DateTime.DATE_MED
            )}
          </Typography>
        )}
      </Grid>
      {/* <Grid item xs={12} style={{ marginTop: '20px' }}>
        <Divider />
      </Grid> */}
    </Grid>
  )
}

export default ArticleCard
