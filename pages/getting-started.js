import React from 'react'
import PageHeader from '../components/Typography/PageHeader/PageHeader.component'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Link from 'next/link'
import TextLink from '../components/Typography/TextLink/TextLink.component'
import SectionHeader from '../components/Typography/SectionHeader/SectionHeader.component'
import ProductFilter from '../components/ProductFilter/ProductFilter.component'
import { fetchAPI } from '../lib/api'
import Markdown from '../components/Markdown/Markdown.component'

const steps = {
  1: 'One',
  2: 'Two',
  3: 'Three',
  4: 'Four',
  5: 'Five',
  6: 'Six',
  7: 'Seven',
  8: 'Eight',
  9: 'Nine',
  10: 'Ten',
  11: 'Eleven',
  12: 'Twelve',
  13: 'Thirteen',
  14: 'Fouteen',
  15: 'Fifteen',
  16: 'Sixteen',
  17: 'Seventeen',
  18: 'Eighteen',
  19: 'Nineteen',
  20: 'Twenty'
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '1200px',
    margin: '0px auto',
    padding: theme.spacing(4),
    paddingTop: theme.custom.screen.navBarHeight
  },
  step: {
    marginBottom: theme.spacing(10),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(5)
    }
  },
  columnOne: {
    [theme.breakpoints.up('md')]: {
      // textAlign: 'right',
      // paddingRight: theme.spacing(5)
    }
  }
}))

export default function GettingStarted({ productData, stepData }) {
  const classes = useStyles()
  return (
    <>
      <PageHeader
        title="Getting Started Is Easy"
        subtitle="Follow these simple steps to get started on your journey"
      />
      <div className={classes.root}>
        <Grid container direction="row" spacing={3}>
          {stepData &&
            stepData.map((step) => {
              return (
                <React.Fragment key={step.id}>
                  <Grid container className={classes.step}>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={3}
                      className={classes.columnOne}
                    >
                      <SectionHeader subtitle={step.stepDescription}>
                        Step {steps[step.order]}
                      </SectionHeader>
                    </Grid>

                    <Grid item xs={12} sm={12} md={9}>
                      {/* <BodyText>{step.instructions}</BodyText> */}
                      <Markdown source={step?.instructions} />
                      {step?.externalLink && (
                        <a href={step?.externalLink?.url} target="_blank">
                          <div>
                            <TextLink icon>
                              {step?.externalLink?.displayText}
                            </TextLink>
                          </div>
                        </a>
                      )}
                    </Grid>
                  </Grid>
                </React.Fragment>
              )
            })}

          <Grid container className={classes.step}>
            {/* <Grid item xs={12} sm={12} md={3} className={classes.columnOne}>
              <SectionHeader subtitle="Browse Killer Whale Products">
                Products
              </SectionHeader>
            </Grid> */}
            <Grid item xs={12} sm={12} md={12}>
              <ProductFilter
                products={productData}
                productTableLink={'/products#productTable'}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [productData, stepData] = await Promise.all([
    fetchAPI('/products'),
    fetchAPI('/getting-started-steps?_sort=order:ASC')
  ])

  return {
    props: {
      productData,
      stepData
    },
    revalidate: 1
  }
}
