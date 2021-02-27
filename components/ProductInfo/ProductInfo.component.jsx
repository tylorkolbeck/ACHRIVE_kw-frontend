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
      <SectionHeader subTitle="Swing, Breakout, HODL, Scalp">
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit,
                  numquam fugit dolor
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit,
                  numquam fugit dolor
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit,
                  numquam fugit dolor
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
