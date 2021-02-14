import React from 'react'
import ProductFilter from '../components/ProductFilter/ProductFilter.component'
import PageHeader from '../components/Typography/PageHeader/PageHeader.component'
import { makeStyles } from '@material-ui/core/styles'
import SectionHeader from '../components/Typography/SectionHeader/SectionHeader.component'
import { fetchAPI } from '../lib/api'

const useStyles = makeStyles(({ spacing, custom }) => ({
  root: {
    maxWidth: custom.screen.maxWidth,
    margin: '0px auto',
    padding: spacing(3),
    paddingTop: custom.screen.navBarHeight
  }
}))

export default function Products({ productData }) {
  const classes = useStyles()
  return (
    <div>
      <PageHeader
        title="Choose Your Money Maker"
        subTitle="Choose the strategy that fits your budget and trading style"
      />
      <div className={classes.root}>
        <div style={{ marginBottom: '50px' }}>
          <SectionHeader>Find the Right Product</SectionHeader>
        </div>
        <ProductFilter products={productData} />
      </div>
    </div>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [productData] = await Promise.all([fetchAPI('/products')])

  return {
    props: {
      productData: productData ? productData : []
    },
    revalidate: 10
  }
}
