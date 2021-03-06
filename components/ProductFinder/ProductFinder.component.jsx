import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import {
  Grid,
  Button,
  Select,
  FormControl,
  InputLabel
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  label: {
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

function ProductFinder({
  filterOptions,
  handleFilterChange,
  handleFilterSubmit,
  selectedFilters,
  resetFiltersHandler
}) {
  const classes = useStyles()

  return (
    <form style={{ width: '100%' }}>
      <Grid container spacing={2}>
        {Object.entries(filterOptions).map(([label, options]) => {
          return (
            <Grid item xs={12} md={2} className={classes.column} key={label}>
              <FormControl variant="outlined" style={{ width: '100%' }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  {label.toUpperCase()}
                </InputLabel>
                <Select
                  label={label?.toUpperCase()}
                  value={
                    selectedFilters[label] ? selectedFilters[label] : 'Any'
                  }
                  variant="outlined"
                  className={classes.input}
                  onChange={(event) =>
                    handleFilterChange(event.target.value, label)
                  }
                >
                  <MenuItem value="Any" default>
                    <em>Any</em>
                  </MenuItem>
                  {options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )
        })}
        <Grid
          container
          className={classes.column}
          spacing={3}
          style={{ padding: '10px' }}
        >
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              onClick={handleFilterSubmit}
              disabled={
                Object.entries(selectedFilters).length > 0 ? false : true
              }
            >
              Filter Products
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="button"
              onClick={resetFiltersHandler}
              variant="contained"
              color="secondary"
              type="submit"
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default ProductFinder
