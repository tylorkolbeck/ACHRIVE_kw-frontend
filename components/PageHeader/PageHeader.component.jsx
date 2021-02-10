import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.secondary.main,
    // color: 'white',
    // boxShadow: '1px 3px 15px rgba(0,0,0,0.2)'
    paddingBottom: '20px'
  },
  content: {
    maxWidth: theme.custom.screen.maxWidth,
    margin: '20px auto',
    // padding: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}))

export default function PageHeader({ title }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography variant="h2">{title}</Typography>
      </div>
    </div>
  )
}
