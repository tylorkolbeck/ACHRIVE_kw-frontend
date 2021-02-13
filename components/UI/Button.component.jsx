import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(({ palette }) => ({
  root: {
    background:
      palette.type === 'light'
        ? palette.secondary.main
        : palette.secondary.main,
    color: 'white',
    '&:hover': {
      background: palette.secondary.light
    }
  }
}))

export default function BodyText({ children, size, clickFunction }) {
  const classes = useStyles()
  const buttonSize = size ? size : 'large'
  return (
    <Button variant="contained" size={buttonSize} className={classes.root} onClick={clickFunction}>
      {children}
    </Button>
  )
}
