import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Grid, Typography } from '@material-ui/core'
import { fade } from '@material-ui/core/styles/colorManipulator'
import withWidth from '@material-ui/core/withWidth'
import { getStrapiMedia } from '../../lib/media'

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
    padding: theme.spacing(2),
    color: 'white',
    '& h5': {
      paddingBottom: theme.spacing(1),
      fontWeight: 'bold'
    },
    height: '150px',

    '&:hover': {
      cursor: 'pointer',
      background: theme.palette.secondary.light
    }
  },
  link: {
    color: theme.custom.color.green,
    fontWeight: 'bold'
  }
}))

function CarouselElement({ data, width, interval }) {
  const seconds = interval?.seconds * 1000
  function buildCarouselData(data, width) {
    let numberOfCards = 3

    switch (width) {
      case 'xs':
        numberOfCards = 1
        break
      case 'sm':
        numberOfCards = 2
        break
      case 'md':
      case 'lg':
      case 'xl':
        numberOfCards = 3
        break

      default:
        numberOfCards = 3
        break
    }
    if (!data || data.length === 0) {
      return []
    }

    if (data.length === 3) {
      return [data]
    }

    const dataArray = []

    for (let i = 0; i <= data.length; i += numberOfCards) {
      dataArray.push(data.slice(i, i + numberOfCards))
    }

    const lastDataGroup = dataArray[dataArray.length - 1]

    if (lastDataGroup.length < numberOfCards) {
      for (let i = 0; i < numberOfCards; i++) {
        if (!lastDataGroup[i]) {
          lastDataGroup.push(data[i])
        }
      }
    }

    return dataArray
  }

  const classes = useStyles()

  function ScrollView(props) {
    const { width, items } = props

    return (
      <Grid container className={classes.root} spacing={5}>
        {items.map((item) => {
          return (
            <Grid item xs>
              <Paper
                className={classes.paper}
                style={{
                  background: `url(${item?.cardImage[0]?.formats?.small?.url})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <Typography variant="h5">{item?.cardTitle}</Typography>
                    <Typography variant="body2">{item?.cardContent}</Typography>
                  </div>

                  <Typography variant="caption" className={classes.link}>
                    LEARN MORE
                  </Typography>
                </div>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    )
  }

  return (
    <Carousel interval={seconds} animation="slide" indicators={false}>
      {buildCarouselData(data, width).map((items, i) => {
        return <ScrollView key={i} items={items} width={width} />
      })}
    </Carousel>
  )
}

export default withWidth()(CarouselElement)
