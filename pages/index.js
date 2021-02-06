import React from 'react'
import Seo from '../components/seo/seo.component'
import { getSortedPostsData } from '../lib/posts'
import { fetchAPI } from '../lib/api'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

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

const useStyles = makeStyles((theme) => {
  const contentPadding = theme.spacing(3)
  const contentHeaderMargin = theme.spacing(2)

  return {
    root: {
      flexGrow: 1,
      overflowX: 'hidden'
    },
    content: {
      maxWidth: theme.custom.screen.maxWidthHome,
      margin: '0px auto'
      // background: 'white'
    },
    Hero: {
      padding: contentPadding,
      paddingTop: '50px',
      paddingBottom: '50px',
      // background: theme.palette.secondary.main,
      backgroundImage:
        'linear-gradient(to right top, #0d46a0, #0a3c94, #073388, #03297d, #002071)',
      color: 'white',
      borderBottom: '5px solid #52c4ed'
    },
    Carousel: {
      // marginTop: '30px'
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
      marginBottom: contentHeaderMargin
      // color: contentHeaderColor
    },
    ContentSubHeader: {
      marginTop: '-10px',
      marginBottom: contentHeaderMargin * 2
    },
    section: {
      marginBottom: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      borderBottom: `2px solid ${theme.palette.secondary.main}`
    },
    newsletterWrapper: {
      // padding: contentPadding
      // border: `2px solid ${theme.custom.color.green}`,
      // padding: '20px',
      // marginBottom: theme.spacing(3),
      // borderRadius: '4px'
      // paddingTop: theme.spacing(2),
      // marginTop: theme.spacing(5)
      // border: '2px solid blue'
      // background: theme.custom.color.green
    }
  }
})

const Home = ({ allPostsData, homepage, global, categories, authors }) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.root} direction="column">
      <Seo seo={homepage.seo} global={global} />
      <Grid container className={classes.Hero}>
        <HomepageHero />
      </Grid>
      <Grid item className={classes.content}>
        <Grid item className={classes.Carousel}>
          <Carousel />
        </Grid>

        <Grid item className={classes.RecentArticles}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={7}>
              <Typography variant="h4" className={classes.ContentHeader}>
                Latest Article
              </Typography>
              <FeaturedArticle article={allPostsData[0]} />
              <Grid item style={{ marginTop: '20px' }}>
                <NewsLetterSignup />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography variant="h4" className={classes.ContentHeader}>
                Recent Articles
              </Typography>
              <RecentArticles articles={allPostsData.slice(0, 5)} />
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
            <Grid item xs={12} sm={7}>
              <Typography variant="h4" className={classes.ContentHeader}>
                Videos
              </Typography>
              <Videos />
            </Grid>
            <Grid item xs={12} sm={5}>
              {/* TRADING PRODUCTS */}
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
              {/* END TRADING PRODUCTS */}

              {/* PREMIUM COMMUNITY */}
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
              {/* END PREMIUM COMMUNITY */}

              {/* REVIEWS */}
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
              {/* END REVIEWS */}
            </Grid>
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
    authors
  ] = await Promise.all([
    getSortedPostsData(5),
    fetchAPI('/global'),
    fetchAPI('/homepage'),
    fetchAPI('/categories'),
    fetchAPI('/writers')
  ])

  return {
    props: { allPostsData, homepage, global, categories, authors },
    revalidate: 10
  }
}

export default Home
