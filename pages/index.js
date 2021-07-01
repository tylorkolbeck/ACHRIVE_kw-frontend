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
import ContactUsForm from '../components/ContactUsForm/ContactUsForm.component'
import DiscordCTA from '../components/DiscordCTA/DiscordCTA.component'

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
  carouselTimer,
  videoData,
  managementPromotion
}) => {
  const classes = useStyles()
  const { userState } = userContext()

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

              {videoData?.length > 0 ? (
                <Videos videoData={videoData} />
              ) : (
                'No Videos have been added...'
              )}
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Grid item style={{ marginBottom: '50px' }}>
                <RecentArticles
                  articles={allPostsData.length && allPostsData.slice(1, 5)}
                />
              </Grid>

              {/* GOOGLE FORM CTA */}
              {managementPromotion && (
                <Paper
                  elevation={1}
                  style={{
                    padding: '20px',
                    marginBottom: '40px',
                    marginTop: '20px'
                  }}
                >
                  <Grid item className={classes.section}>
                    <ContactUsForm data={managementPromotion} />
                  </Grid>
                </Paper>
              )}
              {/* END GOOGLE FORM CTA */}

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
    carouselTimer,
    videoData,
    managementPromotion
  ] = await Promise.all([
    getSortedPostsData(5, '&takeOverFeaturedArticle_eq=true'),
    fetchAPI('/global'),
    fetchAPI('/homepage'),
    fetchAPI('/categories'),
    fetchAPI('/writers'),
    fetchAPI('/carousels'),
    fetchAPI('/carousel-timer'),
    fetchAPI('/videos'),
    fetchAPI('/management-card')
  ])

  console.log('>>>>', allPostsData)

  return {
    props: {
      allPostsData,
      homepage,
      global,
      categories,
      authors,
      carouselData,
      carouselTimer,
      videoData,
      managementPromotion: managementPromotion ? managementPromotion : null
    },
    revalidate: 1
  }
}

export default Home
