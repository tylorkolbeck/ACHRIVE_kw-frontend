import React from 'react'
import PageHeader from '../components/PageHeader/PageHeader.component'
import Footer from '../components/Footer/Footer.component'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import Link from 'next/link'
import ProductFinder from '../components/ProductFinder/ProductFinder.component'

const title = 'Getting Started is Easy'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.custom.screen.maxWidth,
    margin: '0px auto',
    padding: theme.spacing(4),
    paddingTop: theme.custom.screen.navBarHeight
  },
  link: {
    color: theme.palette.secondary.light
  },
  sectionTitle: {
    fontWeight: 'bold',
    paddingBottom: '0.5rem'
  },
  product: {
    marginTop: '2rem',
    marginBottom: '2rem'
  },
  subtitle: {
    paddingBottom: '2rem'
  },
  infoLink: {
    paddingTop: '1rem'
  }
}))

export default function GettingStarted() {
  const classes = useStyles()
  return (
    <>
      <div className={classes.root}>
        <Grid container direction="row" spacing={3}>
          <Grid container>
            <PageHeader title={title} />
            <Grid item xs={12} sm={7}>
              <Typography variant="h5" className={classes.subtitle}>
                Subtitle Information here, this is further teaser text or TLDR
                info to keep the user interested.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <img
                src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/143893990/original/98762e8ce8bb51f8fbfb1184a7b06a3ee1a79e1e/design-how-it-works-flat-illustration-or-flat-icons-for-your-website.jpg"
                alt="how it works"
                style={{
                  height: '100%',
                  width: '100%',
                  maxheight: '800px'
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography
              variant="h5"
              component="h5"
              className={classes.sectionTitle}
            >
              Step One
            </Typography>
            <Typography variant="subtitle1">Setup your Exchange</Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Typography>
            <Typography variant="body1" className={classes.infoLink}>
              Info about Kucoin -
            </Typography>
            <Link href={`/products`}>
              <a>
                <Typography variant="body1" className={classes.link}>
                  Link to Kucoin
                </Typography>
              </a>
            </Link>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography
              variant="h5"
              component="h5"
              className={classes.sectionTitle}
            >
              Step Two
            </Typography>
            <Typography variant="subtitle1">Setup your CryptoHopper</Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Typography>
            <Typography variant="body1" className={classes.infoLink}>
              Info about CryptoHopper -
            </Typography>
            <Link href={`/products`}>
              <a>
                <Typography variant="body1" className={classes.link}>
                  Link to CryptoHopper
                </Typography>
              </a>
            </Link>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography
              variant="h5"
              component="h5"
              className={classes.sectionTitle}
            >
              Step Three
            </Typography>
            <Typography variant="subtitle1">
              Start Using Killer Whale Products
            </Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Typography>
            <Typography variant="body1" className={classes.infoLink}>
              Info about Killer Whale Products -
            </Typography>
            <Link href={`/products`}>
              <a>
                <Typography variant="body1" className={classes.link}>
                  Link to Killer Whale Products
                </Typography>
              </a>
            </Link>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="flex-end" spacing={3}>
          <Grid item xs={12} sm={9} className={classes.product}>
            <ProductFinder />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography
              variant="h5"
              component="h5"
              className={classes.sectionTitle}
            >
              Killer Whale PREMIUM
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Typography>
            <Link href={`#`}>
              <a>
                <Typography variant="body1" className={classes.link}>
                  SEE MORE
                </Typography>
              </a>
            </Link>
            <Link href={`#`}>
              <a>
                <Typography variant="body1" className={classes.link}>
                  DOWNLOAD
                </Typography>
              </a>
            </Link>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography
              variant="h5"
              component="h5"
              className={classes.sectionTitle}
            >
              Killer Whale Free
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Typography>
            <Link href={`#`}>
              <a>
                <Typography variant="body1" className={classes.link}>
                  SEE MORE
                </Typography>
              </a>
            </Link>
            <Link href={`#`}>
              <a>
                <Typography variant="body1" className={classes.link}>
                  DOWNLOAD
                </Typography>
              </a>
            </Link>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography
              variant="h5"
              component="h5"
              className={classes.sectionTitle}
            >
              Killer Whale Scalp
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Typography>
            <Link href={`#`}>
              <a>
                <Typography variant="body1" className={classes.link}>
                  SEE MORE
                </Typography>
              </a>
            </Link>
            <Link href={`#`}>
              <a>
                <Typography variant="body1" className={classes.link}>
                  DOWNLOAD
                </Typography>
              </a>
            </Link>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography
              variant="h5"
              component="h5"
              className={classes.sectionTitle}
            >
              Killer Whale Ultimate
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Typography>
            <Link href={`#`}>
              <a>
                <Typography variant="body1" className={classes.link}>
                  SEE MORE
                </Typography>
              </a>
            </Link>
            <Link href={`#`}>
              <a>
                <Typography variant="body1" className={classes.link}>
                  DOWNLOAD
                </Typography>
              </a>
            </Link>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography
              variant="h5"
              component="h5"
              className={classes.sectionTitle}
            >
              DCA King
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Typography>
            <Link href={`#`}>
              <a>
                <Typography variant="body1" className={classes.link}>
                  SEE MORE
                </Typography>
              </a>
            </Link>
            <Link href={`#`}>
              <a>
                <Typography variant="body1" className={classes.link}>
                  DOWNLOAD
                </Typography>
              </a>
            </Link>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </>
  )
}
