import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Typography } from '@material-ui/core'
import Link from 'next/link'
import SectionHeader from '../Typography/SectionHeader/SectionHeader.component'
import BodyText from '../Typography/BodyText/BodyText.component'
import TextLink from '../Typography/TextLink/TextLink.component'
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
                <SectionHeader>Powerful Trading Products</SectionHeader>
                <BodyText color="white">
                  Strategies and signals to improve your trading, powered by our
                  AI and expert chart analysis.
                </BodyText>
              </Grid>
              <Grid item className={classes.CTA}>
                <Link href="/products">
                  <TextLink icon color="#52c4ed">
                    View Strategies
                  </TextLink>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
