import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import { DateTime } from 'luxon'
import { getStrapiMedia } from '../../lib/media'
import BodyText from '../Typography/BodyText/BodyText.component'
import SectionHeader from '../Typography/SectionHeader/SectionHeader.component'
import CategoryChip from '../Typography/CategoryChip/CategoryChip.component'
import CaptionText from '../Typography/CaptionText/CaptionText.component'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

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
    borderRadius: '4px',
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

const ArticleCard = ({ article, image, authorName, category, description }) => {
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
            {category && (
              <Link href={`/category/${category}`}>
                <a>
                  <CategoryChip>{category}</CategoryChip>
                </a>
              </Link>
            )}
          </Grid>
          <Link href={`/article/${article.slug}`}>
            <a>
              <SectionHeader>{article.title}</SectionHeader>
            </a>
          </Link>
          <BodyText>{description.slice(0, 250)}</BodyText>
          <CaptionText>
            {authorName} &#8226;{' '}
            {DateTime.fromISO(article?.publishedAt).toLocaleString(
              DateTime.DATE_MED
            )}
          </CaptionText>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ArticleCard
