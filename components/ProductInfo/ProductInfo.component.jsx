import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CachedIcon from '@material-ui/icons/Cached'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import { Button, Grid, Typography } from '@material-ui/core'
import BodyText from '../Typography/BodyText/BodyText.component'
import SectionHeader from '../Typography/SectionHeader/SectionHeader.component'
import TextLink from '../Typography/TextLink/TextLink.component'

import CreateIcon from '@material-ui/icons/Create'

const useStyles = makeStyles((theme) => {
  return {
    root: {},
    IconRound: {
      // background: theme.palette.secondary.light,
      background: theme.palette.secondary.main,
      borderRadius: '50%',
      height: '50px',
      width: '50px',
      padding: '10px',
      color: 'white',
      marginRight: '20px'
      // boxShadow: '0px 3px 15px rgba(0,0,0,0.2)'
    },
    Info: {
      marginBottom: theme.spacing(2)
    },
    CTAWrapper: {
      marginTop: theme.spacing(3)
    }
  }
})

export default function ProductInfo() {
  const classes = useStyles()
  return (
    <Grid container direction="column" className={classes.root}>
      <SectionHeader subtitle="Swing, Breakout, HODL, Scalp">
        Trading Strategies
      </SectionHeader>
      <Grid item className={classes.Info}>
        <Grid container direction="row" wrap="nowrap">
          <Grid item>
            <CachedIcon className={classes.IconRound} />
          </Grid>
          <Grid item>
            <Grid container direction="column" justify="space-between">
              <Grid item>
                <Typography variant="h6">Continually Updated</Typography>
              </Grid>
              <Grid item>
                <BodyText>
                  Each Killer Whale strategy is constantly updated depending on
                  market conditions and indicators. Never be behind the curve
                  again
                </BodyText>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item className={classes.Info}>
        <Grid container direction="row" wrap="nowrap">
          <Grid item>
            <AttachMoneyIcon className={classes.IconRound} />
          </Grid>
          <Grid item>
            <Grid container direction="column" justify="space-between">
              <Grid item>
                <Typography variant="h6">Free And Premium</Typography>
              </Grid>
              <Grid item>
                <BodyText>
                  Whether you are new to autoomated trading or an experienced
                  veteran we offer a membership level that will help take your
                  trading to the next level.
                </BodyText>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item className={classes.Info}>
        <Grid container direction="row" wrap="nowrap">
          <Grid item>
            <CreateIcon className={classes.IconRound} />
          </Grid>
          <Grid item>
            <Grid container direction="column" justify="space-between">
              <Grid item>
                <Typography variant="h6">Fully Customizable</Typography>
              </Grid>
              <Grid item>
                <BodyText>
                  Never be alone again. We have a robust community of users that
                  are extremely helpful and willing to share their ideas and
                  knowledge to help guide you on your journey no matter what
                  your experience level.
                </BodyText>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <TextLink icon>View All Products</TextLink>
    </Grid>
  )
}
