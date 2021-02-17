import React from 'react'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'

import Link from 'next/link'
import SectionHeader from '../Typography/SectionHeader/SectionHeader.component'
import BodyText from '../Typography/BodyText/BodyText.component'
import TextLink from '../Typography/TextLink/TextLink.component'

const useStyles = makeStyles(({ spacing, breakpoints, palette }) => {
  const cardImageBackgrounds = {
    strategy: '#005079',
    signal: '#415A63',
    trend: '#4683A3',
    template: '#53C4ED'
  }
  return {
    root: {
      padding: spacing(3),
      margin: '0 auto'
    },
    productImage_wrapper: {
      position: 'relative',
      width: '200px',
      height: '200px',
      minWidth: '200px',
      minHeight: '200px',
      maxWidth: '200px',
      maxHeigt: '200px',
      background: '#53C4ED',
      background: ({ props }) => {
        const productType = props?.productType?.toLowerCase()
        return cardImageBackgrounds[productType]
      },
      borderRadius: '20px',
      [breakpoints.down('md')]: {
        margin: '0 auto',
        marginBottom: spacing(2)
      }
    },

    productImage_backgroundWhale: {
      position: 'absolute',
      zIndex: '100',
      top: -20,
      bottom: 0,
      right: 0,
      left: -40,
      opacity: '.2',
      background: 'url(/images/whale_white.png)'
    },
    productImage: {
      borderRadius: '20px',
      height: '100%'
    },
    productImage_header: {
      background: palette.grey[900],
      color: 'white',
      borderRadius: '20px 20px 0px 0px',
      padding: spacing(1),
      paddingLeft: spacing(2),
      fontSize: '18px'
    },
    productImage_footer: {
      padding: spacing(1),
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold'
    },
    bold: {
      fontWeight: 'bold'
    },
    price: {
      fontWeight: 'bold',
      fontSize: '20px'
    },
    productInfo: {
      width: '100%',
      paddingLeft: spacing(2),
      [breakpoints.down('sm')]: {
        marginBottom: spacing(2)
      }
    },
    infoWrapper: {
      marginTop: spacing(2),
      marginBottom: spacing(1),
      [breakpoints.up('sm')]: {
        marginTop: spacing(4)
      }
    },
    infoLabel: {
      fontSize: '.8rem',
      color: palette.type === 'light' ? 'rgba(0,0,0,.5)' : palette.grey[400],
      fontWeight: 'bold',
      marginRight: spacing(5)
    },
    infoLabelValue: {
      fontWeight: 'bold',
      fontSize: '1rem',
      marginRight: spacing(5)
    }
  }
})
export default function ProductCard({
  name,
  description,
  slug,
  productType,
  price,
  recommendedBalance,
  riskLevel,
  automated,
  full,
  learnMore,
  cryptoHopperLink
}) {
  const classes = useStyles({
    props: {
      productType
    }
  })

  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={12} md className={classes.productImage_wrapper}>
          <Grid
            container
            direction="column"
            justify="space-between"
            className={classes.productImage}
          >
            <Grid item className={classes.productImage_header}>
              <span className={classes.bold}>Killer</span>
              <span>whale</span>
            </Grid>
            <Grid item>
              <div className={classes.productImage_backgroundWhale}></div>
            </Grid>
            <Grid item className={classes.productImage_footer}>
              <Grid item>{name}</Grid>
              <Grid item style={{ fontSize: '14px' }}>
                {productType?.toUpperCase()}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md className={classes.productInfo}>
          <Grid container justify="space-between">
            <SectionHeader>{name} </SectionHeader>

            <Grid item>
              {price && <span className={classes.price}>${price}</span>}
            </Grid>
          </Grid>

          <BodyText>{description}...</BodyText>
          {full && (
            <Grid container className={classes.infoWrapper}>
              <Grid
                item
                xs
                style={{
                  display: 'flex'
                }}
              >
                <Grid item style={{ marginBottom: '20px' }}>
                  <Grid item className={classes.infoLabelValue}>
                    {recommendedBalance}
                  </Grid>
                  <Grid item xs={12} className={classes.infoLabel}>
                    STARTING BALANCE
                  </Grid>
                </Grid>
                <Grid item style={{ marginBottom: '20px' }}>
                  <Grid item className={classes.infoLabelValue}>
                    {riskLevel}
                  </Grid>
                  <Grid item xs={12} className={classes.infoLabel}>
                    RISK LEVEL
                  </Grid>
                </Grid>

                <Grid item style={{ marginBottom: '20px' }}>
                  <Grid item className={classes.infoLabelValue}>
                    {automated ? 'Automated' : 'Self'}
                  </Grid>
                  <Grid item xs={12} className={classes.infoLabel}>
                    AUTOMATED
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                {cryptoHopperLink && (
                  <a href={cryptoHopperLink} target="_blank">
                    <TextLink icon>Install Product</TextLink>
                  </a>
                )}
              </Grid>
            </Grid>
          )}

          {learnMore && (
            <Link href={`/product/${slug}`}>
              <a>
                <TextLink icon>Learn More</TextLink>
              </a>
            </Link>
          )}
        </Grid>
      </Grid>
    </Paper>
  )
}
