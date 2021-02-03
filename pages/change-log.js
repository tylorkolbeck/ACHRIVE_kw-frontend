import {
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { fetchAPI } from '../lib/api'
import { DateTime } from 'luxon'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  },
  version: {
    color: theme.palette.secondary.main
  },
  changeChip: {
    color: theme.palette.secondary.main,
    background: fade(theme.palette.secondary.light, 0.2),
    marginRight: theme.spacing(1)
  },
  header: {
    marginBottom: theme.spacing(2)
  }
}))

export default function ChangeLog({ changeLogData }) {
  const classes = useStyles()

  function formatChange(string) {
    const newString = string.split('|')
    return (
      <Grid item>
        <Grid container wrap="nowrap">
          <Chip
            size="small"
            label={newString[0]}
            className={classes.changeChip}
          />
          <Typography component="p" variant="body2" color="textPrimary">
            {newString[1]}
          </Typography>
        </Grid>
      </Grid>
    )
  }
  return (
    <div className={classes.root}>
      {changeLogData &&
        changeLogData.map((change) => {
          return (
            <List>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <div className={classes.header}>
                      <Typography
                        component="span"
                        variant="h6"
                        className={classes.version}
                      >
                        {`v${change.majorVersion}.${change.minorVersion} - `}
                      </Typography>
                      <Typography component="span" variant="h6">
                        {DateTime.fromISO(change.releaseDate).toLocaleString(
                          DateTime.DATE_FULL
                        )}
                      </Typography>
                    </div>
                  }
                  secondary={change.changeDescription
                    .split('\n')
                    .map((entry, index) => (
                      <Grid container spacing={3}>
                        {' '}
                        {formatChange(entry)}
                      </Grid>
                    ))}
                ></ListItemText>
              </ListItem>
            </List>
          )
        })}
    </div>
  )
}

export async function getStaticProps() {
  const changeLogData = await fetchAPI('/change-logs')

  return {
    props: {
      changeLogData
    }
  }
}
