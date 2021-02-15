import React from 'react'
import PageHeader from '../components/Typography/PageHeader/PageHeader.component'
import Footer from '../components/Footer/Footer.component'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Link from 'next/link'
import TextLink from '../components/Typography/TextLink/TextLink.component'
import BodyText from '../components/Typography/BodyText/BodyText.component'
import SectionHeader from '../components/Typography/SectionHeader/SectionHeader.component'
import ProductFilter from '../components/ProductFilter/ProductFilter.component'
import { fetchAPI } from '../lib/api'

const stepData = [
  {
    id: 1,
    number: 'One',
    subTitle: 'Setup Your Exchange',
    description:
      'Lorem ipsum dolor sit amet, cbero quod sed hic fugiat tenetur doloremque! Laudantium dunt? Natus aperiam fugiat sequi dignissimos saepe ipsa laborum, pariatur delectus qui dolorem impedit minima facere nemo vel eos tempora enim inventore dolores, nesciunt excepturi omnis sed harum sit! Eos eaque repellat corporis soluta quidem autem est, debitis praesentium deleniti veritatis ut id. Numquam rem optio aliquam nesciunt eum aut tenetur fuga, culpa saepe totam molestias ullam cupiditate non, odio voluptate quaerat. Est, saepe ullam.',
    link: {
      label: 'KuCoin',
      url: '/'
    }
  },
  {
    id: 2,
    number: 'Two',
    subTitle: 'Setup Your CryptoHopper',
    description:
      ' sed hic fugiat tenetur doloremque! Laudantium aut mollitia ut rerum dolorum officiis velit vel incidunt? Natus aperiam fugiat sequi dignissimos saepe ipsa laborum, pariatur delectus qui dolorem impedit minima facere nemo vel eos tempora enim inventore dolores, nesciunt excepturi omnis sed harum sit! Eos eaque repellat corporis soluta quidem autem est, debitis praesentium deleniti veritatis ut id. Numquam rem optio aliquam nesciunt eum aut tenetur fuga, culpa saepe totam molestias ullam cupiditate non, odio voluptate quaerat. Est, saepe ullam.',
    link: {
      label: 'CryptoHopper',
      url: '/'
    }
  },
  {
    id: 3,
    number: 'Three',
    subTitle: 'Setup Up Your Killer Whale Strategy',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt voluptate omnis consequatur distinctio molestiae quisquam deleniti quae aperiam, labore libero quod sed hic fugiat tenetur doloremque! Laudantium aut mollitia ut rerum dolorum officiis velit vel incidunt? Natus aperiam fugiat sequi dignissimos saepe ipsa laborum, pariatur delectus qui dolorem impedit minima facere nemo vel eos tempora enim inventore dolores, nesciunt excepturi omnis sed harum sit! Eos eaque repellat corporis soluta quidem autem est, debitis praesentium deleniti veritatis ut id. Numquam rem optio aliquam nesciunt eum aut tenetur fuga, culpa saepe totam molestias ullam cupiditate non, odio voluptate quaerat. Est, saepe ullam.',
    link: {
      label: 'All Products',
      url: '/'
    }
  }
]

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

export default function GettingStarted({ productData }) {
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
                      <SectionHeader subTitle={step.subTitle}>
                        Step {step.number}
                      </SectionHeader>
                    </Grid>

                    <Grid item xs={12} sm={12} md={9}>
                      <BodyText>{step.description}</BodyText>
                      <Link href={step?.link?.url}>
                        <div>
                          <TextLink icon>{step?.link?.label}</TextLink>
                        </div>
                      </Link>
                    </Grid>
                  </Grid>
                </React.Fragment>
              )
            })}

          <Grid container className={classes.step}>
            <Grid item xs={12} sm={12} md={3} className={classes.columnOne}>
              <SectionHeader subTitle="Choose your strategy">
                Step Four
              </SectionHeader>
            </Grid>
            <Grid item xs={12} sm={12} md={9}>
              <ProductFilter products={productData} />
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [productData] = await Promise.all([fetchAPI('/products')])

  return {
    props: {
      productData
    },
    revalidate: 10
  }
}