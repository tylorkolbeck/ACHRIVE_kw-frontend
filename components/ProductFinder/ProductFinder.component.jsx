import React from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import withWidth from '@material-ui/core/withWidth'
import Button from '../../components/UI/Button.component'

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

const useStyles = makeStyles((theme) => ({
  label: {
    marginBottom: '20px',
    fontWeight: 'bold'
  },
  column: {
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(5)
    }
  },
  input: {
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(5)
    }
  }
}))

function ProductFinder({ width }) {
  const classes = useStyles()

  const showLabelsRow = ['md', 'lg', 'xl']

  return (
    <Grid container>
      {showLabelsRow.includes(width) && (
        <Grid container wrap="nowrap">
          <Grid item xs={12} sm={12} md={3} className={classes.column}>
            <Typography className={classes.label}>Starting Balance</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={3} className={classes.column}>
            <Typography className={classes.label}>Risk Comfort</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={3} className={classes.column}>
            <Typography className={classes.label}>
              Self Managed or Automated
            </Typography>
          </Grid>
          {/* <Grid item xs={12} sm={12} md={3} className={classes.column}></Grid> */}
        </Grid>
      )}

      <Grid container>
        <Grid item xs={12} sm={12} md={3} className={classes.column}>
          {!showLabelsRow.includes(width) && (
            <Typography className={classes.label}>Starting Balance</Typography>
          )}
          <TextField
            style={{ width: '100%' }}
            select
            value={startingBalance}
            variant="outlined"
            className={classes.input}
          >
            {startingBalance.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={3} className={classes.column}>
          {!showLabelsRow.includes(width) && (
            <Typography className={classes.label}>Risk Comfort</Typography>
          )}
          <TextField
            style={{ width: '100%' }}
            select
            value={riskComfort}
            variant="outlined"
            className={classes.input}
          >
            {riskComfort.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={3} className={classes.column}>
          {!showLabelsRow.includes(width) && (
            <Typography className={classes.label}>
              Manual Or Auto Trading
            </Typography>
          )}
          <TextField
            style={{ width: '100%' }}
            select
            value={managed}
            variant="outlined"
            className={classes.input}
          >
            {managed.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {/* <Grid item xs={12} sm={12} md={3} className={classes.column}>
          <Button>Search Strategies</Button>
        </Grid> */}
      </Grid>
    </Grid>
  )
}

export default withWidth()(ProductFinder)
