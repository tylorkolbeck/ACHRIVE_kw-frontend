import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

const useStyles = makeStyles(({ palette, custom }) => ({
  root: {
    color: ({ color }) => {
      if (color) {
        return color
      } else {
        return palette.type === 'light'
          ? palette.secondary.dark
          : custom.color.teal
      }
    },
    fontWeight: 'bold',
    fontSize: '16px',
    '&:hover': {
      cursor: 'pointer',

      color: palette.secondary.light
    },
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    marginLeft: '8px',
    marginRight: '8px'
  }
}))

export default function BodyText({
  children,
  icon,
  iconLeft,
  onClick,
  onMouseDown,
  color
}) {
  const classes = useStyles({ color })
  return (
    <div onClick={onClick} onMouseDown={onMouseDown}>
      <Typography variant="body1" className={classes.root}>
        {iconLeft && <FaArrowLeft className={classes.icon} />}

        {children}
        {icon && <FaArrowRight className={classes.icon} />}
      </Typography>
    </div>
  )
}
