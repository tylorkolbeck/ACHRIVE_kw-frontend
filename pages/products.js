import React from 'react'
import ProductFilter from '../components/ProductFilter/ProductFilter.component'
import PageHeader from '../components/Typography/PageHeader/PageHeader.component'
import { makeStyles } from '@material-ui/core/styles'
import { fetchAPI } from '../lib/api'
import ProductTable from '../components/ProductTable/ProductTable.component'
import Seo from '../components/seo/seo.component'

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
      <Seo
        title="Killer Whale Products"
        seo={{
          metaTitle: 'Killer Whale Products',
          metaDescription:
            'Browse through all of Killer Whales products. You can filter based on your trading style or view our product comparison table. Rest assured you will find what fits your budget and trading style. '
        }}
      />

      <div className={classes.root}>
        <div>
          <ProductFilter
            products={productData}
            productTableLink={'#productTable'}
          />
        </div>

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
