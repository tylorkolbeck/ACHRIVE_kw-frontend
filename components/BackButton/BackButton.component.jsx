import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.secondary.main,
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
      <IoMdArrowRoundBack />

      <Typography variant="body1" className={classes.buttonText}>
        {' '}
        BACK
      </Typography>
    </div>
  )
}
