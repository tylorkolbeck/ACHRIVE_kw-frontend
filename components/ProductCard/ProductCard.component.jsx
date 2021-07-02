import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Divider, Grid, Paper } from '@material-ui/core'

import Link from 'next/link'
import SectionHeader from '../Typography/SectionHeader/SectionHeader.component'
import BodyText from '../Typography/BodyText/BodyText.component'
import TextLink from '../Typography/TextLink/TextLink.component'

const useStyles = makeStyles(({ spacing, breakpoints, palette }) => {
  const cardImageBackgrounds = {
    strategy: '#005079',
    signal: '#004ea8',
    trend: '#0089ff',
    template: '#53c4ed',
    aiconfiguration: '#5C9FEB',
    sector_strategy: '#61767D'
  }

  const cardDimensions = {
    height: '150px',
    width: '150px',
    minHeight: '150px',
    minWidth: '150px',
    maxWidth: '150px',
    maxHeight: '150px'
  }
  return {
    root: {
      padding: spacing(3),
      margin: '0 auto'
    },
    productImage_wrapper: {
      position: 'relative',
      ...cardDimensions,
      background: '#53C4ED',
      background: ({ props }) => {
        const productType = props?.productType?.toLowerCase()
        return cardImageBackgrounds[productType]
      },
      borderRadius: '20px',
      [breakpoints.down('md')]: {
        margin: '0 auto',
        marginBottom: spacing(2)
      },
      overflow: 'hidden'
    },

    productImage_backgroundWhale: {
      position: 'absolute',
      zIndex: '0',
      top: 0,
      bottom: 0,
      right: -10,
      left: -40,
      opacity: '.1',
      background: 'url(/images/kw_logo_white.png)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: '150px',
      transform: 'rotate(-30deg)'
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
      fontSize: '16px'
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
      fontSize: '1rem',
      color: palette.type === 'light' ? 'rgba(0,0,0,.9)' : palette.grey[100],
      fontWeight: 'bold',
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
  full,
  learnMore,
  cryptoHopperLink,
  productDetails
}) {
  const classes = useStyles({
    props: {
      productType
    }
  })

  return (
    <Grid className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={12} md className={classes.productImage_wrapper}>
          <Grid
            container
            direction="column"
            justify="space-between"
            className={classes.productImage}
          >
            <Grid item className={classes.productImage_header}>
              <div>
                <img
                  src="/images/kw_logo.png"
                  style={{ height: '15px', marginRight: '10px' }}
                ></img>
                <span className={classes.bold}>Killer</span>
                <span>Whale</span>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.productImage_backgroundWhale}></div>
            </Grid>
            <Grid item className={classes.productImage_footer}>
              <Grid item style={{ fontSize: '16px' }}>
                {name}
              </Grid>
              <Grid item style={{ fontSize: '14px', fontWeight: '400' }}>
                {productType?.toUpperCase().split('_').join(' ')}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md className={classes.productInfo}>
          <Grid container justify="space-between">
            <SectionHeader>{name}</SectionHeader>

            <Grid item>{price ? price : null}</Grid>
          </Grid>

          <BodyText>{description}</BodyText>
          {/* <Divider light style={{ marginBottom: '20px' }} /> */}

          {full && productDetails && (
            <Grid container>
              {Object.entries(productDetails).map(([detail, values]) => {
                return (
                  <Grid
                    item
                    xs={6}
                    sm={4}
                    md={4}
                    key={detail}
                    style={{ padding: '20px', paddingTop: '0px' }}
                  >
                    <Grid item className={classes.infoLabel}>
                      {detail.toUpperCase()}
                    </Grid>

                    {values.map((v) => (
                      <p style={{ margin: '2px' }} key={v}>
                        {v}
                      </p>
                    ))}
                  </Grid>
                )
              })}
            </Grid>
          )}

          {full && (
            <Grid container alignItems="flex-end" justify="flex-end">
              {cryptoHopperLink && (
                <a href={cryptoHopperLink} target="_blank">
                  <TextLink icon>Install Product</TextLink>
                </a>
              )}
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
    </Grid>
  )
}
