import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import TextLink from '../Typography/TextLink/TextLink.component'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.secondary.light,
    cursor: 'pointer',
    margin: '20px 0px'
  },
  buttonText: {
    marginLeft: '10px'
  }
}))

export default function BackButton() {
  const Router = useRouter()
  const classes = useStyles()
  return (
    <div
      className={classes.root}
      onClick={() => {
        Router.back()
      }}
    >
      <TextLink iconLeft>Back</TextLink>
    </div>
  )
}
