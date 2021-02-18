import React from 'react'
import ReactPlayer from 'react-player'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import BackButton from '../../components/BackButton/BackButton.component'
import CategoryChip from '../../components/Typography/CategoryChip/CategoryChip.component'
import SectionHeader from '../../components/Typography/SectionHeader/SectionHeader.component'
import BodyText from '../../components/Typography/BodyText/BodyText.component'
import { getAllVideoIds, getVideoData } from '../../lib/videos'
import NewsLetterSignup from '../../components/NewsLetterSignUp/NewsLetterSignUp.component'
const API_URL = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}`

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
      paddingTop: theme.custom.screen.navBarHeight
    },
    content: {
      maxWidth: theme.custom.screen.maxWidth,
      margin: '0px auto',
      padding: theme.custom.screen.bodyPadding
    },
    marginBottomMd: {
      marginBottom: theme.spacing(3)
    },
    videoWrapper: {
      position: 'relative'
    },
    videoPlayer: {
      position: 'absolute'
    }
  }
})

export default function Video({ videoData }) {
  const classes = useStyles()
  console.log(videoData)
  const { title, video, category, description } = videoData

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.content}>
        <BackButton />
        <div>
          <CategoryChip>{category?.name}</CategoryChip>
        </div>
        <Grid item container>
          <Grid item className={classes.marginBottomMd} xs={12}>
            <SectionHeader>{title}</SectionHeader>
            <BodyText>{description}</BodyText>
          </Grid>
          <Grid item className={classes.videoWrapper} xs={12}>
            <ReactPlayer
              className={classes.videoPlayer}
              controls={true}
              width="100%"
              height="100%"
              style={{
                maxHeight: '360px',
                maxWidth: '640px'
              }}
              url={`${API_URL}${video.url}`}
            />
          </Grid>
        </Grid>
        {/* <Grid container>
          <NewsLetterSignup />
        </Grid> */}
      </Grid>
    </Grid>
  )
}

export async function getStaticPaths() {
  const paths = await getAllVideoIds()

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const videoData = await getVideoData(params.slug)
  return {
    props: {
      videoData
    },
    revalidate: 1
  }
}

Video.defaultProps = {
  videoData: {}
}
