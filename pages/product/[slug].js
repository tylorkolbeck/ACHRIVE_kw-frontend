import React from 'react'
import { getProductIds, getProductData } from '../../lib/products'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SectionHeader from '../../components/Typography/SectionHeader/SectionHeader.component'
import ProductCard from '../../components/ProductCard/ProductCard.component'
import BackButton from '../../components/BackButton/BackButton.component'
import Markdown from '../../components/Markdown/Markdown.component'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      maxWidth: theme.custom.screen.maxWidth,
      margin: '0px auto',
      padding: theme.spacing(3),
      position: 'relative',
      marginBottom: '500px',
      paddingTop: 100
    },
    section: {
      marginBottom: theme.spacing(5),
      [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(5)
      }
    },
    productCard: {
      marginBottom: theme.spacing(5)
    }
  }
})

export default function Product({ productData }) {
  const {
    name,
    description,
    productType,
    price,
    recommendedBalance,
    riskLevel,
    automated,
    cryptoHopperLink,
    features,
    requirements,
    setup
  } = productData || {}

  const classes = useStyles()

  return (
    <div>
      {/* <PageHeader
        title="Killer Whale Premium Signal"
        subTitle="The Easist way to invest in crypto, wth great returns"
      /> */}

      <div className={classes.root}>
        <BackButton />
        <Grid container className={classes.productCard}>
          <ProductCard
            name={name}
            description={description?.slice(0, 250)}
            productType={productType}
            price={
              <span style={{ fontWeight: 'bold', fontSize: '18px' }}>
                {price ? `$${price}` : 'Free'}
              </span>
            }
            recommendedBalance={recommendedBalance}
            automated={automated}
            riskLevel={riskLevel}
            cryptoHopperLink={cryptoHopperLink}
            full
          />
        </Grid>
        <Grid container direction="row">
          {/* PRODUCT FEATURES */}
          {features && (
            <Grid container className={classes.section}>
              <Grid item xs={12} sm={12} md={3} className={classes.columnOne}>
                <SectionHeader>Features</SectionHeader>
              </Grid>

              <Grid item xs={12} sm={12} md={9}>
                <Markdown source={features} />
              </Grid>
            </Grid>
          )}
          {/* PRODUCT REQUIREMENTS */}
          {productData?.requirements && (
            <Grid container className={classes.section}>
              <Grid item xs={12} sm={12} md={3} className={classes.columnOne}>
                <SectionHeader>Requirements</SectionHeader>
              </Grid>

              <Grid item xs={12} sm={12} md={9}>
                <Markdown source={requirements} />
              </Grid>
            </Grid>
          )}
          {/* PRODUCT SETUP */}
          {productData?.setup && (
            <Grid container className={classes.section}>
              <Grid item xs={12} sm={12} md={3} className={classes.columnOne}>
                <SectionHeader>Setup</SectionHeader>
              </Grid>

              <Grid item xs={12} sm={12} md={9}>
                <Markdown source={setup} />
              </Grid>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = await getProductIds()

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const productData = await getProductData(params.slug)

  return {
    props: {
      productData
    },
    revalidate: 1
  }
}
