import { Grid, Button, Divider, Paper } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PageHeader from '../components/PageHeader/PageHeader.component'
import ProductCard from '../components/ProductCard/ProductCard.component'
import ProductFinder from '../components/ProductFinder/ProductFinder.component'

const productData = [
  {
    id: 1,
    name: 'Killer Whale Signal 1',
    description: `This strategy does it all!
    From scalping to medium and long-term holds. accuracy. You want to catch a quick breakout? No worries Killer Whale Pro has your back.
    Pro Version of Killer Whale Algorithmic Intelligence Strategy. Download this strategy to work with Killer Whale Free Template (or configure yourself). Template is always free and will be adjusted accordingly for current market conditions! Just pick the coins you wish to trade and be patient as this strategy typically holds for 2-5 days. If you wish to trade faster you can change the take profit to 2-3% and select sell based on strategy.`,
    category: 'Signals'
  },
  {
    id: 2,
    name: 'Killer Whale Strategy 1',
    description: `This strategy does it all!
    Pro Version of Killer Whale Algorithmic Intelligence Strategy. Download this strategy to work with Killer Whale Free Template (or configure yourself). Template is always free and will be adjusted accordingly for current market conditions! Just pick the coins you wish to trade and be patient as this strategy typically holds for 2-5 days. If you wish to trade faster you can change the take profit to 2-3% and select sell based on strategy.`,
    category: 'Strategies'
  },
  {
    id: 3,
    name: 'Killer Whale Trend 1',
    description: `This strategy does it all!
    From scalping to medium and long-term holds. From bottom detecting to trend analysis this strategy is a powerhouse nailing tops and bottoms with pinpoint accuracy. You want to catch a quick breakout? No worries Killer Whale Pro has your back.`,
    category: 'Trends'
  },
  {
    id: 4,
    name: 'Killer Whale Signal 2',
    description: `This strategy does it all!
    From scalping to medium and long-term holds. From bottom detecting to trend analysis this strategy is a powerhouse nailing tops and bottoms with pinpoint accuracy. You want to catch a quick breakout? No worries Killer Whale Pro has your back.
    Pro Version of Killer Whale Algorithmic Intelligence Strategy. Download this strategy to work with Killer Whale Free Template (or configure yourself). Template is always free and will be adjusted accordingly for current market conditions! Just pick the coins you wish to trade and be patient as this strategy typically holds for 2-5 days. If you wish to trade faster you can change the take profit to 2-3% and select sell based on strategy.`,
    category: 'Signals'
  },
  {
    id: 5,
    name: 'Killer Whale Strategy 2',
    description: `This strategy does it all!
    From scalping to medium and long-term holds. From bottom detecting to trend analysis this strategy is a powerhouse nailing tops and bottoms with pinpoint accuracy. You want to catch a quick breakout? No worries Killer Whale Pro has your back.
    Pro Version of Killer Whale Algorithmic Intelligence Strategy. Download this strategy to work with Killer Whale Free Template (or configure yourself). Template is always free and will be adjusted accordingly for current market conditions! Just pick the coins you wish to trade and be patient as this strategy typically holds for 2-5 days. If you wish to trade faster you can change the take profit to 2-3% and select sell based on strategy.`,
    category: 'Strategies'
  },
  {
    id: 6,
    name: 'Killer Whale Trend 2',
    description: `This strategy does it all!
    From scalping to medium and long-term hies Killer Whale Pro has your back.
    Pro Version of Killer Whale Algorithmic Intelligence Stratege is always free and will be adjusted accordingly for current market conditions! Just pick the coins you wish to trade and be patient as this strategy typically holds for 2-5 days. If you wish to trade faster you can change the take profit to 2-3% and select sell based on strategy.`,
    category: 'Trends'
  }
]

const useStyles = makeStyles(({ spacing, custom, palette }) => ({
  root: {
    maxWidth: custom.screen.maxWidth,
    margin: '0px auto',
    padding: spacing(3),
    paddingTop: custom.screen.navBarHeight
  },

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

export default function Faq() {
  const classes = useStyles()
  const [navState, setNavState] = React.useState('ALL')

  const productsObj = groupBy(productData, 'category')

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
    <div className={classes.root}>
      <PageHeader title="Products" />
      <Grid container>
        <Grid container style={{ marginBottom: '40px' }}>
          <ProductFinder />
        </Grid>
        <Divider style={{ width: '100%', marginBottom: '20px' }} />

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
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    category={product.category}
                    description={product.description}
                    slug={'product-name'}
                    tradeFreq={'LOW'}
                    holdingTime={'3'}
                    profit={'8%'}
                  />
                ))
              }
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
