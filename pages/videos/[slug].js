import React from 'react'
import {
  getAllVideoCategoriesPaths,
  getVideoCategoryData
} from '../../lib/videos'

import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PageHeader from '../../components/Typography/PageHeader/PageHeader.component'
import SectionHeader from '../../components/Typography/SectionHeader/SectionHeader.component'
import BodyText from '../../components/Typography/BodyText/BodyText.component'
import Link from 'next/link'
import { FaPlay } from 'react-icons/fa'
import Seo from '../../components/seo/seo.component'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.custom.screen.maxWidth,
    margin: '0px auto',
    padding: theme.spacing(3),
    paddingTop: theme.custom.screen.navBarHeight
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

export default function Videos({ data }) {
  const videoData = data.videoData[0].videos

  const classes = useStyles()

  return (
    <div>
      <PageHeader
        title={`Videos - ${data?.videoData[0]?.Category}`}
        subtitle={`${
          data?.videoData[0]?.description ? data?.videoData[0]?.description : ''
        }`}
      />
      <Seo
        title="Killer Whale Videos"
        seo={{
          metaTitle: 'Killer Whale Videos',
          metaDescription:
            'Browse our assortment of videos ranging from set up help, tutorials, chart analysis, and much more'
        }}
      />
      <div className={classes.root}>
        {/* <Videos videoData={videos} /> */}
        <Grid container spacing={3}>
          {videoData.map((video) => {
            const oembed = video.oembed ? JSON.parse(video.oembed) : null

            return (
              <Grid
                item
                xs={12}
                md={6}
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
        </Grid>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = await getAllVideoCategoriesPaths()

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const videoData = await getVideoCategoryData(params.slug)

  return {
    props: {
      data: videoData
    }
  }
}

// export async function getStaticProps({ params }) {
//   const categoryArticles = await getArticlesByCategory(params.category)
//   const authors = await fetchAPI('/writers')
//   const categories = await fetchAPI('/categories')

//   return {
//     props: {
//       categoryData: categoryArticles,
//       authors: authors,
//       categories: categories
//     },
//     revalidate: 1
//   }
// }
