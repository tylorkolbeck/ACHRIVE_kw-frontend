import React from 'react'
import { getProductIds, getProductData } from '../../lib/products'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SectionHeader from '../../components/Typography/SectionHeader/SectionHeader.component'
import ProductCard from '../../components/ProductCard/ProductCard.component'
import BackButton from '../../components/BackButton/BackButton.component'
import Markdown from '../../components/Markdown/Markdown.component'
import { fetchAPI } from '../../lib/api'
import Seo from '../../components/Seo/seo.component'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      maxWidth: '820px',
      margin: '0px auto',
      padding: theme.spacing(3),
      position: 'relative'
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

export default function Product({ productData, coinList }) {
  const {
    name,
    description,
    productType,
    price,
    cryptoHopperLink,
    features,
    requirements,
    setup,
    productDetails
  } = productData || {}

  const classes = useStyles()

  const seo = {
    metaTitle: productData?.name,
    metaDescription: productData.description
  }

  return (
    <div>
      <Grid
        container
        style={{
          maxWidth: '1200px',
          paddingLeft: '20px',
          paddingRight: '20px',
          margin: '0 auto',
          paddingTop: '100px'
        }}
      >
        <Seo seo={seo} title={productData.name} />
        <BackButton />
        <Paper className={classes.productCard}>
          <ProductCard
            name={name}
            description={description?.slice(0, 250)}
            productType={productType}
            price={
              <span style={{ fontWeight: 'bold', fontSize: '18px' }}>
                {price ? `$${price}` : 'Free'}
              </span>
            }
            productDetails={productDetails}
            cryptoHopperLink={cryptoHopperLink}
            full
          />
        </Paper>
      </Grid>

      <div className={classes.root}>
        <Grid container direction="row">
          {/* PRODUCT FEATURES */}
          {features && (
            <Grid container className={classes.section}>
              <Grid item xs={12} className={classes.columnOne}>
                <SectionHeader>Features</SectionHeader>
              </Grid>

              <Grid item xs={12}>
                <Markdown source={features} />
              </Grid>
            </Grid>
          )}
          {/* PRODUCT REQUIREMENTS */}
          {productData?.requirements && (
            <Grid container className={classes.section}>
              <Grid item xs={12} className={classes.columnOne}>
                <SectionHeader>Requirements</SectionHeader>
              </Grid>

              <Grid item xs={12}>
                <Markdown source={requirements} />
              </Grid>
            </Grid>
          )}
          {/* PRODUCT SETUP */}
          {productData?.setup && (
            <Grid container className={classes.section}>
              <Grid item xs={12} className={classes.columnOne}>
                <SectionHeader>Setup</SectionHeader>
              </Grid>

              <Grid item xs={12}>
                <Markdown source={setup} coinList={coinList} />
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
  const { coin } = await fetchAPI('/coin-list')

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const productData = await getProductData(params.slug)
  const { coin } = await fetchAPI('/coin-list')

  return {
    props: {
      productData,
      coinList: coin
    },
    revalidate: 1
  }
}
