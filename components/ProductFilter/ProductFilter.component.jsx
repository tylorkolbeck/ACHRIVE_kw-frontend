import { Grid, Button, Paper, Divider } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import ProductCard from '../ProductCard/ProductCard.component'
import ProductFinder from '../ProductFinder/ProductFinder.component'
import SectionHeader from '../../components/Typography/SectionHeader/SectionHeader.component'
import BodyText from '../../components/Typography/BodyText/BodyText.component'
import TextLink from '../../components/Typography/TextLink/TextLink.component'
import { useRouter } from 'next/router'

const useStyles = makeStyles(({ palette }) => ({
  NavButton: {
    marginRight: '10px',
    color: palette.secondary.main,

    '&:hover': {
      background: palette.secondary.main,
      color: 'white'
    }
  },
  activeNav: {
    background: palette.secondary.main,
    color: 'white'
  }
}))

export default function ProductFilter({ products, productTableLink }) {
  const router = useRouter()
  const classes = useStyles()
  const [navState, setNavState] = React.useState('ALL')

  // The different options to filter on
  const [filterOptions, setFilterOptions] = React.useState({})

  // Track filters that are selected
  const [selectedFilters, setSelectedFilters] = React.useState({})

  const [isFiltered, setIsFiltered] = React.useState(false)

  // Set filtered products to all products initially
  const [filteredProducts, setFilteredProducts] = React.useState(
    groupBy(products, 'productType')
  )

  React.useEffect(() => {
    // Group all of the product details that are available as a filter option
    if (products.length > 0) {
      const uniqueDetails = {}

      products.forEach((product) => {
        const detailKeys = Object.keys(product.productDetails)
        // add entries to associated product detail
        detailKeys.forEach((key) => {
          let keyLowerCase = key.toLowerCase()
          product.productDetails[key].forEach((val) => {
            if (uniqueDetails[keyLowerCase]) {
              uniqueDetails[keyLowerCase].push(val.toLowerCase())
            } else {
              uniqueDetails[keyLowerCase] = [val.toLowerCase()]
            }
          })
        })
      })

      // Remove duplicate entries
      for (let detail in uniqueDetails) {
        uniqueDetails[detail] = [...new Set(uniqueDetails[detail])]
      }
      setFilterOptions(uniqueDetails)
    }
  }, [])

  function handleFilterChange(value, field) {
    const copy = { ...selectedFilters }
    copy[field] = value
    setSelectedFilters(copy)
    setIsFiltered(false)
    setFilteredProducts(groupBy(products, 'productType'))
  }

  function handleFilterSubmit(e) {
    e.preventDefault()
    const filteredProducts = products.filter((product) => {
      const productDetails = product.productDetails

      let isMatch = true
      for (let detail in productDetails) {
        const detailsArray = productDetails[detail].map((d) => d.toLowerCase())
        if (
          detailsArray.includes(selectedFilters[detail]) ||
          selectedFilters[detail] === 'Any' ||
          !selectedFilters[detail]
        ) {
        } else {
          isMatch = false
        }
      }
      return isMatch
    })

    setFilteredProducts(groupBy(filteredProducts, 'productType'))
    setIsFiltered(true)
    router.push('#products')
  }

  function resetFiltersHandler(e) {
    e.preventDefault()

    setFilteredProducts(groupBy(products, 'productType'))
    setSelectedFilters({})
    setIsFiltered(false)
  }

  function groupBy(productData, property) {
    const products = productData.reduce((acc, obj) => {
      let key = obj[property]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj)
      return acc
    }, {})

    return products
  }

  function mapProductCards(filteredProducts) {
    let productMap = {}
    let strategiesTemp = {}
    const products = Object.entries(filteredProducts).map(([key]) => {
      if (key.toUpperCase() === navState || navState === 'ALL') {
        const cards = filteredProducts[key].map((product) => (
          <Grid item xs={12} sm={6} key={product.id}>
            <ProductCard
              name={product.name}
              productType={product.productType}
              description={product?.description?.slice(0, 120) + '...'}
              slug={product?.slug}
              learnMore
            />
          </Grid>
        ))

        // Does this so that the strategies are shown first when rendered
        // A little hacky but it works.... atleast for now
        if (key.toLowerCase() === 'strategy') {
          strategiesTemp[key] = cards
        } else {
          productMap[key] = cards
        }

        return cards
      }
    })

    return { ...strategiesTemp, ...productMap }
  }

  return (
    <div>
      <Grid container>
        <Paper style={{ padding: '30px 20px', width: '100%' }}>
          <div style={{ marginBottom: '30px' }}>
            <SectionHeader>Find the Right Product</SectionHeader>
            <BodyText style={{ paddingBottom: '20px' }}>
              Finding the right product is simple, filter through our products,
              browse through all of them or view our{' '}
              <span style={{ paddingLeft: '4px' }}>
                <a href={productTableLink}>
                  <TextLink> Product Comparison Table</TextLink>
                </a>
              </span>
            </BodyText>
          </div>
          <Grid container justify="center">
            <ProductFinder
              filterOptions={filterOptions}
              handleFilterChange={handleFilterChange}
              handleFilterSubmit={handleFilterSubmit}
              selectedFilters={selectedFilters}
              resetFiltersHandler={resetFiltersHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider light style={{ marginTop: '20px' }} />
          </Grid>

          <Grid item xs>
            {isFiltered && Object.entries(selectedFilters).length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <span
                  style={{
                    marginRight: '10px',
                    fontWeight: 'bold',
                    marginLeft: '10px'
                  }}
                >
                  FILTERING BY:
                </span>
                {Object.entries(selectedFilters).map(([key, value]) => (
                  <span style={{ marginRight: '10px' }} key={key}>
                    {key} - <b>{value}</b>
                  </span>
                ))}
              </div>
            )}
            <Grid
              container
              spacing={2}
              style={{ position: 'relative', padding: '20px' }}
            >
              {Object.entries(filteredProducts).length > 0 && (
                <Grid
                  container
                  style={{ marginBottom: '10px', marginTop: '10px' }}
                  key="nav_tabs"
                >
                  <Button
                    className={`${classes.NavButton} ${
                      navState === 'ALL' ? classes.activeNav : ''
                    }`}
                    onClick={() => setNavState('ALL')}
                  >
                    All
                  </Button>
                  {Object.entries(filteredProducts).map(([key]) => (
                    <Button
                      className={`${classes.NavButton} ${
                        navState === key.toUpperCase() ? classes.activeNav : ''
                      }`}
                      onClick={() => setNavState(key.toUpperCase())}
                      key={key}
                    >
                      {key.toUpperCase().split('_').join(' ')}
                    </Button>
                  ))}
                </Grid>
              )}
              <span
                id="products"
                style={{ position: 'absolute', top: '-150px' }}
              ></span>

              {Object.entries(filteredProducts).length > 0 ? (
                Object.entries(mapProductCards(filteredProducts)).map(
                  ([key, value]) => (
                    <React.Fragment key={key}>
                      <h2>{key.toUpperCase().split('_').join(' ')}</h2>
                      <Grid container>{value}</Grid>
                    </React.Fragment>
                  )
                )
              ) : (
                <div style={{ marginTop: '50px', padding: '20px' }}>
                  <SectionHeader subtitle="Try a less specific search">
                    No products found that match your filters
                  </SectionHeader>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={resetFiltersHandler}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  )
}
