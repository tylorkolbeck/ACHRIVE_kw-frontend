import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import { FaPlay } from 'react-icons/fa'
import Link from 'next/link'
import SectionHeader from '../Typography/SectionHeader/SectionHeader.component'
import BodyText from '../Typography/BodyText/BodyText.component'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  videoCard: {
    marginBottom: theme.spacing(4)
  },

  videoImage: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    paddingTop: '56.25%' /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
  },
  videoBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',

    '&:hover': {
      cursor: 'pointer'
    }
  },
  videoAuthor: {
    color: theme.palette.secondary.light
  },
  date: {
    marginLeft: theme.spacing(2)
  },

  playButton: {
    lineHeight: '110px',
    height: '100px',
    width: '100px',
    background: theme.palette.secondary.main,
    color: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '40px',
    textAlign: 'center',
    borderRadius: '10px',
    boxShadow: '4px 4px 2px rgba(0,0,0,.5)',

    '&:hover': {
      cursor: 'pointer',
      background: theme.palette.secondary.light
    }
  }
}))

export default function Videos({ videoData }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {videoData.map((video) => {
        const oembed = video.oembed ? JSON.parse(video.oembed) : null

        return (
          <Grid
            container
            direction="column"
            className={classes.videoCard}
            key={video.id}
          >
            <Link href={`/video/${video.slug}`}>
              <Grid item className={classes.videoImage}>
                <div
                  className={classes.videoBackground}
                  style={{
                    backgroundImage: `url(${oembed.thumbnail})`
                  }}
                ></div>
                <div className={classes.playButton}>
                  <FaPlay />
                </div>
              </Grid>
            </Link>
            <Grid item style={{ marginTop: '20px' }}>
              <Link href={`/video/${video.slug}`}>
                <a>
                  <SectionHeader>{video.title}</SectionHeader>
                </a>
              </Link>
              <BodyText>{video.description}</BodyText>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-end"
              >
                {video.date && (
                  <Typography variant="caption" className={classes.date}>
                    {video.date}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        )
      })}
    </div>
  )
}
