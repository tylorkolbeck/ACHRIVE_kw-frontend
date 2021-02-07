import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.secondary.light
  }
}))

export default function CategoryChip({ label }) {
  const chipLabel = label ? label : ''
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Link href={`/category/${chipLabel}`}>
        <a>{chipLabel.toUpperCase()}</a>
      </Link>
    </div>
  )
}
