import React from 'react'
import BackButton from '../components/BackButton/BackButton.component'
import PageHeader from '../components/PageHeader/PageHeader.component'
import Image from '../components/image/image.component'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import Link from 'next/link'

const title = 'Getting Started is Easy'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.custom.screen.maxWidth,
    margin: '0px auto',
    padding: theme.spacing(3),
    paddingTop: theme.custom.screen.navBarHeight
  }
}))

export default function GettingStarted() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <BackButton />
      <PageHeader title={title} />
      <Grid container direction="row" wrap="nowrap" spacing={3}>
        <Grid item xs={3}>
          <Typography variant="h5" component="h5">
            Step One
          </Typography>
          <Typography variant="subtitle1">Setup your Exchange</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Typography>
          <Typography variant="body2">Info about Kucoin -</Typography>
          {/* <Link href={`/category/${category}`}>
            <a>
              <Typography variant="caption" className={classes.categoryName}>
                {category && category.toUpperCase()}
              </Typography>
            </a>
          </Link> */}
        </Grid>
      </Grid>
      <Grid container direction="row" wrap="nowrap" spacing={3}>
        <Grid item xs={3}>
          <Typography variant="h5" component="h5">
            Step Two
          </Typography>
          <Typography variant="subtitle1">Setup your CryptoHopper</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Typography>
          <Typography variant="body2">Info about CryptoHopper -</Typography>
        </Grid>
      </Grid>
      <Grid container direction="row" wrap="nowrap" spacing={3}>
        <Grid item xs={3}>
          <Typography variant="h5" component="h5">
            Step Three
          </Typography>
          <Typography variant="subtitle1">
            Start Using Killer Whale Products
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Typography>
          <Typography variant="body2">
            Info about KillerWhale Products -
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}
