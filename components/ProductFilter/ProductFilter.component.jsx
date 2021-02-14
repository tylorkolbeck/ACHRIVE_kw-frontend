import { Grid, Button } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import ProductCard from '../ProductCard/ProductCard.component'
import ProductFinder from '../ProductFinder/ProductFinder.component'

const useStyles = makeStyles(({ palette }) => ({
  NavButton: {
    marginRight: '10px',
    marginBottom: '20px',
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

export default function ProductFilter({ products }) {
  const classes = useStyles()
  const [navState, setNavState] = React.useState('ALL')

  const productsObj = groupBy(products, 'productType')

  function groupBy(productData, property) {
    return productData.reduce((acc, obj) => {
      let key = obj[property]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj)
      return acc
    }, {})
  }

  return (
    <div>
      <Grid container>
        <Grid container style={{ marginBottom: '40px' }}>
          <ProductFinder />
        </Grid>

        <Grid container>
          <Button
            className={`${classes.NavButton} ${
              navState === 'ALL' ? classes.activeNav : ''
            }`}
            onClick={() => setNavState('ALL')}
          >
            All
          </Button>
          {Object.entries(productsObj).map(([key]) => (
            <Button
              className={`${classes.NavButton} ${
                navState === key.toUpperCase() ? classes.activeNav : ''
              }`}
              onClick={() => setNavState(key.toUpperCase())}
              key={key}
            >
              {key}
            </Button>
          ))}
        </Grid>
        <Grid item xs>
          <Grid container spacing={5}>
            {Object.entries(productsObj).map(([key]) => {
              if (key.toUpperCase() === navState || navState === 'ALL') {
                return productsObj[key].map((product) => (
                  <Grid item xs={12} sm={6} key={product.id}>
                    <ProductCard
                      name={product.name}
                      productType={product.productType}
                      description={product?.description?.slice(0, 120)}
                      slug={product?.slug}
                      learnMore
                    />
                  </Grid>
                ))
              }
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
