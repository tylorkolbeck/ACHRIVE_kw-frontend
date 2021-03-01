import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextLink from '../Typography/TextLink/TextLink.component'
import Link from 'next/link'
import SectionHeader from '../Typography/SectionHeader/SectionHeader.component'
import { makeid } from '../../lib/utils'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '90vw',
    overflow: 'scroll',
    margin: '0 auto',
    marginTop: '50px'
  },
  table: {
    borderCollapse: 'seperate',
    borderSpacing: '0px 0px',
    textAlign: 'left',
    width: '100%',

    '& tr:last-child td': {
      borderBottom: 'none'
    },

    '& td:first-of-type': {
      width: '200px'
    },
    '& td': {
      verticalAlign: 'top',
      borderBottom: `1px solid ${
        theme.palette.type === 'light'
          ? theme.palette.grey[300]
          : theme.palette.grey[800]
      }`,

      padding: '10px 20px'
    },
    '& th': {
      background: theme.palette.grey[200],
      padding: '10px 20px',
      textTransform: 'uppercase',
      fontWeight: 'bold'
    }
  }
}))

export default function ProductTable({ productData }) {
  function groupProductTypes(productData) {
    const productTypes = {}

    productData.forEach((product) => {
      if (productTypes[product?.productType]) {
        productTypes[product?.productType].push(product)
      } else {
        productTypes[product?.productType] = [product]
      }
    })
    return productTypes
  }

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <SectionHeader style={{ textAlign: 'center', marginBottom: '20px' }}>
        Product Comparison Table
      </SectionHeader>
      {productData &&
        Object.entries(groupProductTypes(productData)).map(
          ([type, products]) => {
            return (
              <div
                style={{
                  maxWidth: '1200px',
                  margin: ' 0 auto'
                }}
                key={makeid(5)}
              >
                <table className={classes.table}>
                  <tbody>
                    <tr>
                      <th>{type}</th>
                      <th>Starting Balance</th>
                      <th>Risk Comfort</th>
                      <th>Experience</th>
                      <th>Trade Duration</th>
                      <th>Trade Freq.</th>
                    </tr>

                    {products.map((product) => {
                      return (
                        <tr key={product?.id}>
                          <td>
                            <Link href={`product/${product?.slug}`}>
                              <a>
                                <TextLink>{product?.name}</TextLink>
                              </a>
                            </Link>
                          </td>
                          {Object.entries(product?.productDetails).map(
                            ([key, value]) => (
                              <td key={key}>
                                {value.map((v) => (
                                  <React.Fragment key={v}>
                                    {v}
                                    <br />
                                  </React.Fragment>
                                ))}
                              </td>
                            )
                          )}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )
          }
        )}
    </div>
  )
}
