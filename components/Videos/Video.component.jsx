import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import { FaPlay } from 'react-icons/fa'
import Link from 'next/link'

const videos = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1543286386-713bdd548da4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
    title: 'Potential Outcomes For Bitcoin in 2021!',
    author: 'Dylan Shively',
    date: 'September 14, 2020'
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1591994843349-f415893b3a6b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
    title: 'Potential Outcomes For Bitcoin in 2021!',
    author: 'Dylan Shively',
    date: 'September 14, 2020'
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1516245834210-c4c142787335?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2549&q=80',
    title: 'Potential Outcomes For Bitcoin in 2021!',
    author: 'Dylan Shively',
    date: 'September 14, 2020'
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1600275411995-66b1d2a79fc7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
    title: 'Potential Outcomes For Bitcoin in 2021!',
    author: 'Dylan Shively',
    date: 'September 14, 2020'
  }
]

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  videoCard: {
    marginBottom: theme.spacing(4)
  },
  videoTitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  videoImage: {
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      // background: 'lightgrey',
      height: '25vw'
    },
    [theme.breakpoints.down('sm')]: {
      // background: 'lightgrey',
      height: '50vw'
    }
  },
  videoAuthor: {
    color: theme.palette.secondary.main
  },
  date: {
    marginLeft: theme.spacing(2)
  },
  videoBackground: {
    '&:hover': {
      cursor: 'pointer',
      '&:after': {
        background: 'none',
        background: theme.palette.secondary.dark,
        opacity: '0.3'
      }
    },
    // '&:after': {
    //   content: "''",
    //   position: 'absolute',
    //   height: '100px',
    //   width: '100px',
    //   bottom: '0px',
    //   right: '0px',
    //   background: theme.palette.secondary.main,
    //   zIndex: '100'
    // },
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '100%',
    width: '100%'
  },
  playButton: {
    padding: '20px',
    paddingBottom: '15px',
    background: theme.palette.secondary.main,
    color: 'white',
    position: 'absolute',
    right: '0px',
    bottom: '0px',
    fontSize: '20px',
    textAlign: 'center',
    '&:hover': {
      cursor: 'pointer',
      background: theme.palette.secondary.light
    }
  }
}))

export default function Videos() {
  const classes = useStyles()
  return (
    <Link href={`video/video-slug`}>
      <div className={classes.root}>
        {videos.map((video) => (
          <Grid
            container
            direction="column"
            className={classes.videoCard}
            key={video.id}
          >
            <Grid item className={classes.videoImage}>
              <div
                className={classes.videoBackground}
                style={{
                  backgroundImage: `url(${video.image})`
                }}
              ></div>
              <div className={classes.playButton}>
                <FaPlay />
              </div>
            </Grid>
            <Grid item>
              <Typography
                variant="h5"
                component="h3"
                className={classes.videoTitle}
              >
                {video.title}
              </Typography>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-end"
              >
                <Typography variant="body2" className={classes.videoAuthor}>
                  {video.author}
                </Typography>
                <Typography variant="caption" className={classes.date}>
                  {video.date}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </div>
    </Link>
  )
}
