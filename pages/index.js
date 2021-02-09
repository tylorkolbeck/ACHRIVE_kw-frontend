import React from 'react'
import Seo from '../components/seo/seo.component'
import { getSortedPostsData } from '../lib/posts'
import { fetchAPI } from '../lib/api'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, Paper } from '@material-ui/core'

import HomepageHero from '../components/HomepageHero/HomepageHero.component'
import Carousel from '../components/Carousel/Carousel.component'
import FeaturedArticle from '../components/FeaturedArticle/FeaturedArticle.component'
import RecentArticles from '../components/RecentArticles/RecentArticles.component'
import ProductInfo from '../components/ProductInfo/ProductInfo.component'
import PremiumCommunityInfo from '../components/PremiumCommunityInfo/PremiumCommunityInfo.component'
import Reviews from '../components/Review/Review.component'
import Videos from '../components/Videos/Video.component'
import Footer from '../components/Footer/Footer.component'
import NewsLetterSignup from '../components/NewsLetterSignUp/NewsLetterSignUp.component'
import ScrollToTopButton from '../components/ScrollToTopButton/ScrollToTopButton.component'

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
  categories,
  authors,
  carouselData,
  carouselTimer
}) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.root} direction="column">
      <ScrollToTopButton />
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
              {/* <Typography variant="h4" className={classes.ContentHeader}>
                Latest Article
              </Typography> */}
              {/* <Paper
                elevation={1}
                style={{ padding: '20px', marginBottom: '20px' }}
              > */}
              <FeaturedArticle article={allPostsData[0]} />
              {/* </Paper> */}
              <Grid item style={{ marginTop: '50px', marginBottom: '50px' }}>
                <NewsLetterSignup />
              </Grid>
              {/* <Paper
                elevation={1}
                style={{ padding: '20px', marginBottom: '20px' }}
              > */}
              <Videos />
              {/* </Paper> */}
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              {/* <Typography variant="h4" className={classes.ContentHeader}>
                Recent Articles
              </Typography> */}
              {/* <Paper
                elevation={1}
                style={{ padding: '20px', marginBottom: '20px' }}
              > */}
              <Grid item>
                <RecentArticles articles={allPostsData.slice(0, 4)} />
              </Grid>
              {/* </Paper> */}
              {/* -------- */}

              {/* TRADING PRODUCTS */}
              <Paper
                elevation={1}
                style={{
                  padding: '20px',
                  marginBottom: '20px',
                  marginTop: '20px'
                }}
              >
                <Grid item className={classes.section}>
                  <Typography
                    variant="h4"
                    component="h4"
                    className={classes.ContentHeader}
                  >
                    Trading Products
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    component="p"
                    className={classes.ContentSubHeader}
                  >
                    Swing, Breakout, HODL, Scalp
                  </Typography>
                  <ProductInfo />
                </Grid>
              </Paper>
              {/* END TRADING PRODUCTS */}

              {/* PREMIUM COMMUNITY */}
              <Paper
                elevation={1}
                style={{ padding: '20px', marginBottom: '20px' }}
              >
                <Grid container direction="column" className={classes.section}>
                  <Typography variant="h4" className={classes.ContentHeader}>
                    Premium Community
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="p"
                    className={classes.ContentSubHeader}
                  >
                    Be a part of the active Killer Whale Pod!
                  </Typography>
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
                  <Typography variant="h4" className={classes.ContentHeader}>
                    Reviews
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="p"
                    className={classes.ContentSubHeader}
                  >
                    Hear from the Killer Whale Pod!
                  </Typography>
                  <Reviews />
                </Grid>
              </Paper>
              {/* END REVIEWS */}

              {/* -------------- */}
            </Grid>
          </Grid>
        </Grid>
        {/* 
        <Grid item className={classes.newsletterWrapper}>
          <NewsLetterSignup />
        </Grid> */}

        {/* BOTTOM SECTION MARKETING */}
        <Grid item className={classes.Marketing}>
          <Grid container spacing={5}>
            {/* <Grid item xs={12} sm={7}>
              <Typography variant="h4" className={classes.ContentHeader}>
                Videos
              </Typography>
              <Videos />
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
      <Footer />

      {/* <Seo seo={homepage.seo} global={global} />
      <HomepageBlogHeader articles={allPostsData} />
      <Divider style={{ margin: '20px' }} />
      <div style={{ marginTop: '50px' }}>
        <ArticleCategoryList categories={categories} authors={authors} />
      </div> */}
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
