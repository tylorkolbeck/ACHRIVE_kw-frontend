import React from 'react'
import Image from '../image/image.component'
import { Grid, Typography, Divider, Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import { DateTime } from 'luxon'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(0.5)
  },
  cardTitle: {
    fontWeight: 'bold'
  },
  articleImgWrapper: {
    '& img': {
      width: '125px',
      height: '75px'
    }
  },
  author: {
    marginTop: 'auto',
    color: theme.palette.primary.light
  },
  categoryChip: {
    marginBottom: theme.spacing(1)
  }
}))

const ArticleCard = ({
  article,
  last,
  authorName,
  category,
  strip,
  description
}) => {
  const classes = useStyles()
  const imgStyles = { maxWidth: '100%', objectFit: 'cover' }
  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          {!strip && (
            <Grid item className={classes.articleImgWrapper}>
              <Image style={imgStyles} image={article.image} />
            </Grid>
          )}
          <Grid item xs={7}>
            <Grid
              container
              direction="column"
              style={{ height: '100%' }}
              alignItems="flex-start"
            >
              {category && !strip && (
                <Link href={`/category/${category}`}>
                  <Chip
                    color="secondary"
                    variant="outlined"
                    size="small"
                    component="a"
                    href={`/categories/${article.category.name}`}
                    label={category}
                    clickable
                    className={classes.categoryChip}
                  />
                </Link>
              )}
              <Link href={`/article/${article.slug}`} color="inherit">
                <a>
                  <Typography className={classes.cardTitle}>
                    {article.title}
                  </Typography>
                </a>
              </Link>
              {description && (
                <Typography variant="body1">{description}</Typography>
              )}

              <Typography variant="caption" className={classes.author}>
                {authorName} &#8226;{' '}
                {DateTime.fromISO(article.published_at).toLocaleString(
                  DateTime.DATETIME_MED
                )}
              </Typography>
            </Grid>
          </Grid>
          {/* <Grid item xs={12}> */}
          {/* </Grid> */}
        </Grid>
      </Grid>
      <Divider />
    </Grid>
  )
}

export default ArticleCard
