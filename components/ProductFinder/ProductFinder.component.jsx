import React from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const startingBalance = [
  {
    value: '0-500',
    label: '0-500'
  },
  {
    value: '500-1500',
    label: '500-1500'
  },
  {
    value: '1500-2500',
    label: '1500-2500'
  },
  {
    value: '2500-5000',
    label: '2500-5000'
  },
  {
    value: '5000+',
    label: '5000+'
  }
]

const riskComfort = [
  {
    value: 'risky',
    label: 'risky'
  },
  {
    value: 'moderate risk',
    label: 'moderate risk'
  },
  {
    value: 'low risk',
    label: 'low risk'
  },
  {
    value: 'shouldnt be doing this',
    label: 'shouldnt be doing this'
  }
]

const managed = [
  {
    label: 'Self Managed',
    value: 'Self Managed'
  },
  {
    label: 'Automated',
    value: 'Automated'
  }
]

const useStyles = makeStyles(() => ({
  label: {
    marginBottom: '10px'
  }
}))

export default function ProductFinder() {
  const classes = useStyles()
  return (
    <Grid container>
      <Typography
        variant="h5"
        style={{ fontWeight: 'bold', marginBottom: '20px' }}
      >
        Find The Right Product
      </Typography>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={4}>
          <label>
            <Typography className={classes.label}>Starting Balance</Typography>
            <TextField
              style={{ width: '100%' }}
              id="outlined-select-currency"
              select
              value={startingBalance}
              // helperText="Choose your starting balance"
              variant="outlined"
            >
              {startingBalance.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </label>
        </Grid>
        <Grid item xs={12} sm={4}>
          <label>
            <Typography className={classes.label}>Risk Comfort</Typography>

            <TextField
              style={{ width: '100%' }}
              id="outlined-select-currency"
              select
              value={riskComfort}
              // helperText="How much risk are you willing to take"
              variant="outlined"
            >
              {riskComfort.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </label>
        </Grid>
        <Grid item xs={12} sm={4}>
          <label>
            <Typography className={classes.label}>
              Self Managed or Automated
            </Typography>
            <TextField
              style={{ width: '100%' }}
              id="outlined-select-currency"
              select
              value={managed}
              // helperText="Do you want trading automated or manual"
              variant="outlined"
            >
              {managed.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </label>
        </Grid>
      </Grid>
    </Grid>
  )
}
