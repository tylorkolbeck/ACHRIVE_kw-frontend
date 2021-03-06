import React from 'react'
import { Grid } from '@material-ui/core'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import { getStrapiMedia } from '../../lib/media'
import { DateTime } from 'luxon'
import BodyText from '../Typography/BodyText/BodyText.component'
import CaptionText from '../Typography/CaptionText/CaptionText.component'
import SectionHeader from '../Typography/SectionHeader/SectionHeader.component'
import { useRouter } from 'next/router'

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
    maxHeight: '500px',
    width: '100%',
    borderRadius: '4px',
    backgroundImage: (article) => {
      return `url(${getStrapiMedia(article.image)})`
    },
    [theme.breakpoints.down('sm')]: {
      height: '60vw'
    },
    backgroundSize: 'cover',
    backgroundPosition: 'left top',
    backgroundRepeat: 'no-repeat',
    '&:hover': {
      cursor: 'pointer'
    }
  }
}))

const MainArticle = ({ article }) => {
  const classes = useStyles(article)
  const router = useRouter()

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item>
        <Grid
          container
          className={classes.imageContainer}
          onClick={() => router.push(`/article/${article.slug}`)}
        ></Grid>

        <Link href={`/article/${article.slug}`}>
          <a>
            <SectionHeader>{article.title}</SectionHeader>
          </a>
        </Link>
      </Grid>

      <Grid item>
        <BodyText>{article.description.slice(0, 500)}...</BodyText>
        <CaptionText>
          {article?.author?.name} &#8226;{' '}
          {DateTime.fromISO(article.publishedAt).toLocaleString(
            DateTime.DATE_MED
          )}
        </CaptionText>
      </Grid>
    </Grid>
  )
}

export default MainArticle
