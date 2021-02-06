import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Divider, Grid, Typography } from '@material-ui/core'
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
      [theme.breakpoints.down('xs')]: {
        fontSize: '4rem'
      }
    },
    heroSubTitle: {
      fontStyle: 'italic',
      fontSize: '24px',
      paddingTop: 0
    },
    CTA: {
      marginTop: theme.spacing(2),
      '& button': {
        background: '#14c07b',
        color: 'white'
      }
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
            <Typography variant="h2" className={classes.heroTitle}>
              Change The Way You Trade
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
        <Grid container direction="column">
          <Grid item>
            <Grid container>
              <Grid item>
                <Typography variant="body1">
                  <b>Powerful Trading Products</b>
                </Typography>
                <Typography variant="caption">
                  Strategies and signals to improve your trading, powered by our
                  AI and expert chart analysis.
                </Typography>
              </Grid>
              <Grid item className={classes.CTA}>
                <Button variant="contained" xs={12}>
                  View Stratigies
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
