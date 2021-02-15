import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles(({ palette }) => ({
  root: {
    '& label.Mui-focused': {
          color:
            palette.type === 'light' ? palette.grey[900] : '#ffffff'
        },
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor:
              palette.type === 'light' ? palette.grey[900] : '#ffffff'
          }
        }
    }
}))

export default function BodyText({
  variant, 
  value,
  placeholder,
  className,
  style,
  select,
  margin, 
  size,
  required, 
  fullWidth, 
  id, 
  label, 
  name, 
  autoComplete, 
  autoFocus,
  onFocus, 
  error,
  helperText,
  onChange,
  ref,
  children
}) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
    <TextField 
    variant={variant} 
    value={value}
    placeholder={placeholder}
    className={className}
    style={style}
    select={select}
    margin={margin} 
    size={size}
    required={required} 
    fullWidth={fullWidth} 
    id={id} 
    label={label} 
    name={name} 
    autoComplete={autoComplete} 
    autoFocus={autoFocus} 
    onFocus={onFocus}
    error={error}
    helperText={helperText}
    onChange={onChange} 
    ref={ref}
    >
      {children}
    </TextField>
    </div>
  )
}
