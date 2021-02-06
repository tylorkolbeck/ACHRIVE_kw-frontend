import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Grid, Typography } from '@material-ui/core'
import { fade } from '@material-ui/core/styles/colorManipulator'
import withWidth from '@material-ui/core/withWidth'

const breakpoints = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl'
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  [theme.breakpoints.down('sm')]: {
    smHidden: {
      display: 'none'
    }
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    // background: fade(theme.palette.secondary.main, 0.1),
    background: fade(theme.palette.secondary.dark, 0.8),
    // background: '#14c07b',
    // color: 'white',
    height: '150px',
    '&:hover': {
      cursor: 'pointer',
      background: theme.palette.secondary.light
    },
    color: 'white'
  }
}))

const items = ['1', '2']

function CarouselElement({ cardData, width }) {
  const classes = useStyles()

  function ScrollView(props) {
    const { width } = props

    switch (width) {
      case 'xs':
        return (
          <Grid container className={classes.root}>
            <Grid item xs>
              <Paper className={classes.paper}>
                {/* <Typography variant="h5">Promo Message</Typography> */}
              </Paper>
            </Grid>
          </Grid>
        )
      case 'sm':
        return (
          <Grid container className={classes.root} spacing={5}>
            <Grid item xs>
              <Paper className={classes.paper}>
                <Typography variant="h5">Custom Message</Typography>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                <Typography variant="h5">Custom Message</Typography>
              </Paper>
            </Grid>
          </Grid>
        )
      case 'md':
      case 'lg':
      case 'xl':
        return (
          <Grid container className={classes.root} spacing={5}>
            <Grid item xs>
              <Paper className={classes.paper}>
                <Typography variant="h5">Custom Message</Typography>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                <Typography variant="h5">Custom Message</Typography>
              </Paper>
            </Grid>
            <Grid item xs className={classes.smHidden}>
              <Paper className={classes.paper}>
                <Typography variant="h5">Custom Message</Typography>
              </Paper>
            </Grid>
          </Grid>
        )
      default:
        return (
          <Grid container className={classes.root} spacing={5}>
            <Grid item xs>
              <Paper className={classes.paper}></Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}></Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}></Paper>
            </Grid>
          </Grid>
        )
    }
  }

  return (
    <Carousel interval={10000} animation="slide">
      {items.map((item, i) => (
        <ScrollView key={i} item={item} width={width} />
      ))}
    </Carousel>
  )
}

export default withWidth()(CarouselElement)
