import React from 'react'
import PageHeader from '../components/Typography/PageHeader/PageHeader.component'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Link from 'next/link'
import TextLink from '../components/Typography/TextLink/TextLink.component'
import BodyText from '../components/Typography/BodyText/BodyText.component'
import SectionHeader from '../components/Typography/SectionHeader/SectionHeader.component'
import ProductFilter from '../components/ProductFilter/ProductFilter.component'
import { fetchAPI } from '../lib/api'
import Markdown from '../components/Markdown/Markdown.component'

// const stepData = [
//   {
//     id: 1,
//     number: 'One',
//     subTitle: 'Setup Your Exchange',
//     description:
//       'Lorem ipsum dolor sit amet, cbero quod sed hic fugiat tenetur doloremque! Laudantium dunt? Natus aperiam fugiat sequi dignissimos saepe ipsa laborum, pariatur delectus qui dolorem impedit minima facere nemo vel eos tempora enim inventore dolores, nesciunt excepturi omnis sed harum sit! Eos eaque repellat corporis soluta quidem autem est, debitis praesentium deleniti veritatis ut id. Numquam rem optio aliquam nesciunt eum aut tenetur fuga, culpa saepe totam molestias ullam cupiditate non, odio voluptate quaerat. Est, saepe ullam.',
//     link: {
//       label: 'KuCoin',
//       url: '/'
//     }
//   },
//   {
//     id: 2,
//     number: 'Two',
//     subTitle: 'Setup Your CryptoHopper',
//     description:
//       ' sed hic fugiat tenetur doloremque! Laudantium aut mollitia ut rerum dolorum officiis velit vel incidunt? Natus aperiam fugiat sequi dignissimos saepe ipsa laborum, pariatur delectus qui dolorem impedit minima facere nemo vel eos tempora enim inventore dolores, nesciunt excepturi omnis sed harum sit! Eos eaque repellat corporis soluta quidem autem est, debitis praesentium deleniti veritatis ut id. Numquam rem optio aliquam nesciunt eum aut tenetur fuga, culpa saepe totam molestias ullam cupiditate non, odio voluptate quaerat. Est, saepe ullam.',
//     link: {
//       label: 'CryptoHopper',
//       url: '/'
//     }
//   },
//   {
//     id: 3,
//     number: 'Three',
//     subTitle: 'Setup Up Your Killer Whale Strategy',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt voluptate omnis consequatur distinctio molestiae quisquam deleniti quae aperiam, labore libero quod sed hic fugiat tenetur doloremque! Laudantium aut mollitia ut rerum dolorum officiis velit vel incidunt? Natus aperiam fugiat sequi dignissimos saepe ipsa laborum, pariatur delectus qui dolorem impedit minima facere nemo vel eos tempora enim inventore dolores, nesciunt excepturi omnis sed harum sit! Eos eaque repellat corporis soluta quidem autem est, debitis praesentium deleniti veritatis ut id. Numquam rem optio aliquam nesciunt eum aut tenetur fuga, culpa saepe totam molestias ullam cupiditate non, odio voluptate quaerat. Est, saepe ullam.',
//     link: {
//       label: 'All Products',
//       url: '/'
//     }
//   }
// ]

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
    maxWidth: theme.custom.screen.maxWidth,
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
        subTitle="Subtitle Information here, this is further teaser text or TLDR
                info to keep the user interested."
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
                      <SectionHeader subTitle={step.stepDescription}>
                        Step {steps[step.order]}
                      </SectionHeader>
                    </Grid>

                    <Grid item xs={12} sm={12} md={9}>
                      {/* <BodyText>{step.instructions}</BodyText> */}
                      <Markdown source={step?.instructions} />
                      {step?.externalLink && (
                        <Link href={step?.externalLink?.url}>
                          <div>
                            <TextLink icon>
                              {step?.externalLink?.displayText}
                            </TextLink>
                          </div>
                        </Link>
                      )}
                    </Grid>
                  </Grid>
                </React.Fragment>
              )
            })}

          <Grid container className={classes.step}>
            <Grid item xs={12} sm={12} md={3} className={classes.columnOne}>
              <SectionHeader subTitle="Browse Killer Whale Products">
                Products
              </SectionHeader>
            </Grid>
            <Grid item xs={12} sm={12} md={9}>
              <ProductFilter products={productData} />
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
    fetchAPI('/getting-started-steps')
  ])

  return {
    props: {
      productData,
      stepData
    },
    revalidate: 1
  }
}
