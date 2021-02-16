import React from 'react'
import { Paper } from '@material-ui/core'
import useClickOutside from './clickOutside'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '../UI/TextField.component'

const useStyles = makeStyles((theme) => ({
  root: {},
  resultsWrapper: {
    position: 'absolute',
    background: '',
    left: 0,
    right: 0,
    top: '56px',
    padding: '20px',
    maxHeight: '200px',
    overflowY: 'scroll',
    paddingTop: '20px'
  }
}))

export default function SearchField({ value, onChange, children }) {
  const classes = useStyles()

  const { ref, isVisible, setIsVisible } = useClickOutside(true)

  return (
    <div style={{ position: 'relative' }}>
      <TextField
        value={value}
        onChange={onChange}
        variant="outlined"
        label="Search FAQs"
        style={{ width: '100%' }}
        onFocus={() => setIsVisible(true)}
        ref={ref}
      />
      {isVisible && children.length > 0 && (
        <Paper className={classes.resultsWrapper}>{children}</Paper>
      )}
    </div>
  )
}
