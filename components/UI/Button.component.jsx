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
    },
    whiteSpace: 'nowrap'
  }
}))

export default function BodyText({ children, size, onClick }) {
  const classes = useStyles()
  const buttonSize = size ? size : 'large'
  return (
    <Button variant="contained" size={buttonSize} className={classes.root} onClick={onClick}>
      {children}
    </Button>
  )
}
