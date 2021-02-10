import React from 'react'
import ProductFilter from '../components/ProductFilter/ProductFilter.component'
import PageHeader from '../components/Typography/PageHeader/PageHeader.component'
import { makeStyles } from '@material-ui/core/styles'
import SectionHeader from '../components/Typography/SectionHeader/SectionHeader.component'
const useStyles = makeStyles(({ spacing, custom, palette }) => ({
  root: {
    maxWidth: custom.screen.maxWidth,
    margin: '0px auto',
    padding: spacing(3),
    paddingTop: custom.screen.navBarHeight
  }
}))

export default function Products() {
  const classes = useStyles()
  return (
    <div>
      <PageHeader
        title="Choose Your Money Maker"
        subTitle="Choose the strategy that fits your budget and trading style"
      />
      <div className={classes.root}>
        <div style={{ marginBottom: '50px' }}>
          <SectionHeader>Strategy Filter</SectionHeader>
        </div>
        <ProductFilter />
      </div>
    </div>
  )
}
