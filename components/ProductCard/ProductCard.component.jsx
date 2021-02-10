import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, Card, CardContent, Divider } from '@material-ui/core'
import Link from 'next/link'
import TextLink from '../Typography/TextLink/TextLink.component'

const useStyles = makeStyles((theme) => ({
  productCard: {
    padding: '16px'
  },
  productCard_image: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '200px',
    minWidth: '200px',
    maxWidth: '200px',
    height: '200px',
    backgroundImage: 'url(/iconExample2.png)',
    borderRadius: '20px',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 20px auto'
    }
  },
  productCard_category: {
    color: 'grey',
    paddingBottom: '10px'
  },
  productCard_name: {
    marginBottom: '10px',
    fontWeight: 'bold'
  },
  productCard_description: {
    marginBottom: '10px',
    color: theme.palette.type === 'light' ? 'rgba(0,0,0,.7)' : 'white'
  },
  productCard_info: {
    display: 'flex',
    color: theme.palette.type === 'light' ? 'rgba(0,0,0,.7)' : 'white',
    '& p': {
      fontSize: '14px'
    }
  },
  infoLabel: {
    textTransform: 'uppercase',
    display: 'block',
    color: '#585858',
    color: theme.palette.type === 'light' ? '#585858' : 'white'
  },
  info: {
    textAlign: 'center'
  },
  infoData: {
    fontSize: '34px',
    margin: '20px auto',
    marginBottom: '0px',
    fontWeight: 'bold'
  },
  learnMoreLink: {
    color:
      theme.palette.type === 'light'
        ? theme.palette.secondary.main
        : theme.palette.secondary.light
  }
}))
export default function ProductCard({
  name,
  description,
  slug,
  tradeFreq,
  holdingTime,
  profit,
  category
}) {
  const classes = useStyles()
  return (
    <Grid item xs={12} sm={12} md={6}>
      <Card className={classes.productCard}>
        <Grid container direction="row">
          <Grid item className={classes.productCard_image}></Grid>
          <Grid item xs style={{ minWidth: '250px' }}>
            <CardContent style={{ paddingTop: '0px' }}>
              <Typography
                variant="h5"
                component="h5"
                className={classes.productCard_name}
              >
                {name}
              </Typography>

              <Typography className={classes.productCard_description}>
                {description?.slice(0, 120)}...
              </Typography>
              <Link href="/">
                <a>
                  <TextLink>Get Started</TextLink>
                </a>
              </Link>
            </CardContent>
          </Grid>
        </Grid>
        <Grid container alignContent="center" justify="space-around">
          <Divider style={{ width: '100%', marginTop: '10px' }} />
          <Grid item xs={4} sm={3} className={classes.info}>
            <Typography
              className={classes.infoData}
              style={{ color: '#4caf50' }}
            >
              {tradeFreq}
            </Typography>
            <span className={classes.infoLabel}>Frequency</span>
          </Grid>
          <Grid item xs={4} sm={3} className={classes.info}>
            <Typography
              className={classes.infoData}
              style={{ color: '#ff9800' }}
            >
              {holdingTime}
            </Typography>
            <span className={classes.infoLabel}>Holding/Hours</span>
          </Grid>
          <Grid item xs={12} sm={3} className={classes.info}>
            <Typography
              className={classes.infoData}
              style={{ color: '#4caf50' }}
            >
              {profit}
            </Typography>
            <span className={classes.infoLabel}>Profit</span>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}
