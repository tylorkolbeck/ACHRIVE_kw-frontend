import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';

const useStyles = makeStyles((theme) => (
  {
    root: {
      position: 'fixed',
      display: 'block',
      bottom: '30px',
      right: '30px',
      height: '40px',
      width: '40px',
      textAlign: 'center',
      fontSize: '2rem',
      // padding: '10px',
      borderRadius: '50%',
      color: 'white',
      background: theme.palette.secondary.main,
      '&:hover': {
        cursor: 'pointer',
        background: theme.palette.secondary.light
      }
    }
  }
))

function ScrollToTopButton() {
  const classes = useStyles()

  function scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className={classes.root} onClick={scrollToTop}>
      <ArrowUpwardRoundedIcon />
    </div>
  )
}

export default ScrollToTopButton


