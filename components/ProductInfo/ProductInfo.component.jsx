import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CachedIcon from '@material-ui/icons/Cached'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import { Button, Grid, Typography } from '@material-ui/core'

import CreateIcon from '@material-ui/icons/Create'

const useStyles = makeStyles((theme) => {
  return {
    root: {},
    IconRound: {
      // background: theme.palette.secondary.light,
      background: '#14c07b',
      borderRadius: '50%',
      height: '50px',
      width: '50px',
      padding: '10px',
      color: 'white',
      marginRight: '20px',
      boxShadow: '2px 3px 15px rgba(0,0,0,0.3)'
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
                <Typography variant="body2" component="p">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit,
                  numquam fugit dolor quisquam sint tempore nobis quae dicta
                  ullam cupiditate!
                </Typography>
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
                <Typography variant="body2" component="p">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit,
                  numquam fugit dolor quisquam sint tempore nobis quae dicta
                  ullam cupiditate!
                </Typography>
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
                <Typography variant="body2" component="p">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit,
                  numquam fugit dolor quisquam sint tempore nobis quae dicta
                  ullam cupiditate!
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.CTAWrapper}>
        <Button variant="contained" color="secondary">
          View Products
        </Button>
      </Grid>
    </Grid>
  )
}
