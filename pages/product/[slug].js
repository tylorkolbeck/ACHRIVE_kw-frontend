import React from 'react'
import { getProductIds, getProductData } from '../../lib/products'
import ReactMarkdown from 'react-markdown'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PageHeader from '../../components/Typography/PageHeader/PageHeader.component'
import Footer from '../../components/Footer/Footer.component'
import SectionHeader from '../../components/Typography/SectionHeader/SectionHeader.component'
import ProductCard from '../../components/ProductCard/ProductCard.component'
import BackButton from '../../components/BackButton/BackButton.component'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      maxWidth: theme.custom.screen.maxWidth,
      margin: '0px auto',
      padding: theme.spacing(3),
      position: 'relative',
      marginBottom: '500px',
      paddingTop: theme.custom.screen.navBarHeight
    },
    section: {
      marginBottom: theme.spacing(5),
      [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(5)
      }
    },
    productCard: {
      marginBottom: theme.spacing(5)
    },
    markdownStyling: {
      fontSize: '1rem',
      color: 'rgba(0,0,0,.7)',
      '& img': {
        maxWidth: '100%'
      },

      '& span': {
        width: '100%',
        display: 'block',
        textAlign: 'center'
      },
      '& iframe': {
        margin: '0 auto',
        textAlign: 'center',
        background: 'lightgrey',
        marginBottom: '30px'
      },

      '& p': {
        lineHeight: '1.8rem',
        marginTop: '0px',
        marginBottom: '1.5rem'
      },
      '& a': {
        color: theme.palette.secondary.dark,
        '&:hover': {
          color: theme.palette.secondary.light
        }
      }
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
    cryptoHopperLink
  } = productData

  const classes = useStyles()
  return (
    <div>
      <PageHeader
        title="Killer Whale Premium Signal"
        subTitle="The Easist way to invest in crypto, wth great returns"
      />

      <div className={classes.root}>
        <BackButton />
        <Grid container className={classes.productCard}>
          <ProductCard
            name={name}
            description={description.slice(0, 250)}
            productType={productType}
            price={price}
            recommendedBalance={recommendedBalance}
            automated={automated}
            riskLevel={riskLevel}
            cryptoHopperLink={cryptoHopperLink}
            full
          />
        </Grid>
        <Grid container direction="row">
          {/* PRODUCT FEATURES */}
          {productData.features && (
            <Grid container className={classes.section}>
              <Grid item xs={12} sm={12} md={3} className={classes.columnOne}>
                <SectionHeader>Features</SectionHeader>
              </Grid>

              <Grid item xs={12} sm={12} md={9}>
                <div className={classes.markdownStyling}>
                  <ReactMarkdown
                    source={productData.features}
                    escapeHtml={false}
                  />
                </div>
              </Grid>
            </Grid>
          )}
          {/* PRODUCT REQUIREMENTS */}
          {productData.requirements && (
            <Grid container className={classes.section}>
              <Grid item xs={12} sm={12} md={3} className={classes.columnOne}>
                <SectionHeader>Requirements</SectionHeader>
              </Grid>

              <Grid item xs={12} sm={12} md={9}>
                <div className={classes.markdownStyling}>
                  <ReactMarkdown
                    source={productData.requirements}
                    escapeHtml={false}
                  />
                </div>
              </Grid>
            </Grid>
          )}
          {/* PRODUCT SETUP */}
          {productData.setup && (
            <Grid container className={classes.section}>
              <Grid item xs={12} sm={12} md={3} className={classes.columnOne}>
                <SectionHeader>Setup</SectionHeader>
              </Grid>

              <Grid item xs={12} sm={12} md={9}>
                <div className={classes.markdownStyling}>
                  <ReactMarkdown
                    source={productData.setup}
                    escapeHtml={false}
                  />
                </div>
              </Grid>
            </Grid>
          )}
        </Grid>
      </div>
      <Footer />
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
    revalidate: 10
  }
}
