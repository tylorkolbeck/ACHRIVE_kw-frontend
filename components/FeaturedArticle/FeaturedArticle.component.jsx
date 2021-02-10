import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import { getStrapiMedia } from '../../lib/media'
import { DateTime } from 'luxon'
import BodyText from '../Typography/BodyText/BodyText.component'
import CaptionText from '../Typography/CaptionText/CaptionText.component'
import SectionHeader from '../Typography/SectionHeader/SectionHeader.component'

const useStyles = makeStyles((theme) => ({
  root: {
    '& a': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  imageContainer: {
    width: 'auto',
    flexGrow: 1,
    marginBottom: '20px',
    height: '24vw',
    width: '100%',
    borderRadius: '4px',
    backgroundImage: (article) => {
      return `url(${getStrapiMedia(article.image)})`
    },
    [theme.breakpoints.down('sm')]: {
      height: '60vw'
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
      <Grid item>
        <Grid container className={classes.imageContainer}></Grid>

        <Link href={`/article/${article.slug}`}>
          <a>
            <SectionHeader>{article.title}</SectionHeader>
          </a>
        </Link>
      </Grid>

      <Grid item>
        <BodyText>
          {article.description.slice(100)}...
          <Link href={`/article/${article.slug}`}>
            <a>Read More</a>
          </Link>
        </BodyText>
        <CaptionText>
          {article?.author?.name} &#8226;{' '}
          {DateTime.fromISO(article.published_at).toLocaleString(
            DateTime.DATE_MED
          )}
        </CaptionText>
      </Grid>
    </Grid>
  )
}

export default MainArticle
