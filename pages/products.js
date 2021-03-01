import React from 'react'
import ProductFilter from '../components/ProductFilter/ProductFilter.component'
import PageHeader from '../components/Typography/PageHeader/PageHeader.component'
import { makeStyles } from '@material-ui/core/styles'
import SectionHeader from '../components/Typography/SectionHeader/SectionHeader.component'
import { fetchAPI } from '../lib/api'
import ProductTable from '../components/ProductTable/ProductTable.component'
import TextLink from '../components/Typography/TextLink/TextLink.component'

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
        subtitle="Choose the strategy that fits your budget and trading style"
      />

      <div className={classes.root}>
        <div
          style={{
            marginBottom: '50px',
            display: 'flex',
            alignItems: 'baseline'
          }}
        >
          <SectionHeader>Find the Right Product</SectionHeader>
          <span style={{ width: '20px' }}></span>
          <a href="#productTable">
            <TextLink>Product Comparison Table</TextLink>
          </a>
        </div>
        <ProductFilter products={productData} />

        <div style={{ position: 'relative' }}>
          <span
            id="productTable"
            style={{ position: 'absolute', top: '-100px' }}
          ></span>
          <ProductTable productData={productData} />
        </div>
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
    revalidate: 1
  }
}
