import React from 'react'
import Seo from '../components/seo/seo.component'
import { getSortedPostsData } from '../lib/posts'
import { fetchAPI } from '../lib/api'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { userContext } from '../context/UserContext'
import HomepageHero from '../components/HomepageHero/HomepageHero.component'
import Carousel from '../components/Carousel/Carousel.component'
import FeaturedArticle from '../components/FeaturedArticle/FeaturedArticle.component'
import RecentArticles from '../components/RecentArticles/RecentArticles.component'
import ProductInfo from '../components/ProductInfo/ProductInfo.component'
import PremiumCommunityInfo from '../components/PremiumCommunityInfo/PremiumCommunityInfo.component'
import Reviews from '../components/Review/Review.component'
import Videos from '../components/Videos/Video.component'
import NewsLetterSignup from '../components/NewsLetterSignUp/NewsLetterSignUp.component'

const useStyles = makeStyles((theme) => {
  const contentPadding = theme.spacing(3)
  const contentHeaderMargin = theme.spacing(2)

  return {
    root: {
      flexGrow: 1,
      overflowX: 'hidden'
    },
    content: {
      maxWidth: theme.custom.screen.maxWidth,
      margin: '0px auto'
    },
    Hero: {
      padding: contentPadding,
      paddingTop: '150px',
      paddingBottom: '50px',
      background: '#212121',
      backgroundImage: `url(/blockchain5.png)`,
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      // backgroundImage:
      //   'linear-gradient(to right top, #0d46a0, #0a3c94, #073388, #03297d, #002071)',
      color: 'white'
    },
    Carousel: {
      padding: contentPadding,
      marginTop: '30px',
      marginBottom: '30px'
    },
    RecentArticles: {
      padding: contentPadding
    },
    Marketing: {
      padding: contentPadding
    },
    ContentHeader: {
      marginBottom: contentHeaderMargin,
      fontWeight: 'bold'
    },
    ContentSubHeader: {
      marginTop: '-10px',
      marginBottom: contentHeaderMargin * 2
    }
  }
})

const Home = ({
  allPostsData,
  homepage,
  global,
  carouselData,
  carouselTimer
}) => {
  const classes = useStyles()
  const { userState, setUserState } = userContext()

  return (
    <Grid container className={classes.root} direction="column">
      <Seo seo={homepage.seo} global={global} />
      <Grid container className={classes.Hero}>
        <HomepageHero />
      </Grid>
      <Grid item className={classes.content}>
        <Grid item className={classes.Carousel}>
          <Carousel data={carouselData} interval={carouselTimer} />
        </Grid>

        <Grid item className={classes.RecentArticles}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6} md={8}>
              <FeaturedArticle article={allPostsData[0]} />
              {/* Hide newsletter when user is logged in */}
              {!userState.user && (
                <Grid item style={{ marginTop: '50px', marginBottom: '50px' }}>
                  <NewsLetterSignup />
                </Grid>
              )}
              <Videos />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Grid item style={{ marginBottom: '50px' }}>
                <RecentArticles articles={allPostsData.slice(0, 3)} />
              </Grid>

              {/* TRADING PRODUCTS */}
              <Paper
                elevation={1}
                style={{
                  padding: '20px',
                  marginBottom: '40px',
                  marginTop: '20px'
                }}
              >
                <Grid item className={classes.section}>
                  <ProductInfo />
                </Grid>
              </Paper>
              {/* END TRADING PRODUCTS */}

              {/* PREMIUM COMMUNITY */}
              <Paper
                elevation={1}
                style={{ padding: '20px', marginBottom: '40px' }}
              >
                <Grid container direction="column" className={classes.section}>
                  <PremiumCommunityInfo />
                </Grid>
              </Paper>
              {/* END PREMIUM COMMUNITY */}

              {/* REVIEWS */}
              <Paper
                elevation={1}
                style={{ padding: '20px', marginBottom: '20px' }}
              >
                <Grid container direction="column" className={classes.section}>
                  <Reviews />
                </Grid>
              </Paper>
              {/* END REVIEWS */}

              {/* -------------- */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [
    allPostsData,
    global,
    homepage,
    categories,
    authors,
    carouselData,
    carouselTimer
  ] = await Promise.all([
    getSortedPostsData(5),
    fetchAPI('/global'),
    fetchAPI('/homepage'),
    fetchAPI('/categories'),
    fetchAPI('/writers'),
    fetchAPI('/carousels'),
    fetchAPI('/carousel-timer')
  ])

  return {
    props: {
      allPostsData,
      homepage,
      global,
      categories,
      authors,
      carouselData,
      carouselTimer
    },
    revalidate: 10
  }
}

export default Home
