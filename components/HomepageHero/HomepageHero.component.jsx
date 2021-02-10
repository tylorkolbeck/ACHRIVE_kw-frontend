import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Typography } from '@material-ui/core'
import Link from 'next/link'
// import BG from '../../public/bg.jpg'

const useStyles = makeStyles((theme) => {
  return {
    hero: {
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      margin: '0px auto',
      maxWidth: theme.custom.screen.maxWidthHome
    },

    heroTitle: {
      fontFamily: 'archiveFont',
      lineHeight: 1,
      // color: theme.palette.secondary.main,
      [theme.breakpoints.down('xs')]: {
        fontSize: '4rem'
      }
    },
    heroSubTitle: {
      fontStyle: 'italic',
      fontSize: '24px',
      paddingTop: 0,
      fontWeight: '400',
      [theme.breakpoints.down('xs')]: {
        fontSize: '1rem',
        marginTop: '10px'
      }
    },
    CTA: {
      marginTop: theme.spacing(2),
      color: theme.custom.color.teal
    },
    blueText: {
      color: theme.custom.color.teal
    }
  }
})

export default function HomepageHero() {
  const classes = useStyles()
  return (
    <Grid container className={classes.hero} spacing={5}>
      <Grid item xs={12} sm={8}>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h1" className={classes.heroTitle}>
              <span className={classes.blueText}>Change</span> The Way You Trade
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" className={classes.heroSubTitle}>
              Join our Killer Whale pod and begin securing your financial
              freedom!
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Grid
          container
          direction="column"
          justify="center"
          style={{ height: '100%' }}
        >
          <Grid item>
            <Grid container>
              <Grid item>
                <Typography variant="h5">
                  <b>Powerful Trading Products</b>
                </Typography>
                <Typography variant="body1">
                  Strategies and signals to improve your trading, powered by our
                  AI and expert chart analysis.
                </Typography>
              </Grid>
              <Grid item className={classes.CTA}>
                <Link href="/products">
                  <a>
                    <Typography>View Stratigies</Typography>
                  </a>
                </Link>
                {/* <Button variant="contained" xs={12}>
                  View Stratigies
                </Button> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item style={{ flexGrow: 1 }}>
        <Grid
          container
          style={{ flexGrow: 1 }}
          spacing={5}
          direction="row"
          justify="center"
          alignItems="stretch"
        >
          <Grid item xs>
            <Grid
              container
              direction="column"
              justify="space-between"
              style={{ height: '100%' }}
            >
              <Typography variant="h6">Premium Content</Typography>
              <Typography variant="caption">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis
              </Typography>
              <Grid item>
                <Button
                  xs={12}
                  className={classes.CTA}
                  style={{ marginTop: 'auto' }}
                >
                  Join Premium
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs>
            <Grid
              container
              direction="column"
              justify="space-between"
              style={{ height: '100%' }}
            >
              <Typography variant="h6">Powerful Strategies</Typography>
              <Typography variant="caption">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis, quaerat!
              </Typography>
              <Grid item>
                <Button className={classes.CTA}>View Stratigies</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            <Grid
              container
              direction="column"
              justify="space-between"
              style={{ height: '100%' }}
            >
              <Typography variant="h6">Expert Chart Analysis</Typography>
              <Typography variant="caption">
                Lorem ipsum dolor sit amet consectetur Reiciendis, quaerat!
              </Typography>

              <Grid item>
                <Button className={classes.CTA}>View Analysis</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  )
}
