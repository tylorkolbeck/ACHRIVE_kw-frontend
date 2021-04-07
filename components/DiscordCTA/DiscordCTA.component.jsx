import React from 'react'
import { SiDiscord } from 'react-icons/si'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  discordCTA: {
    '&:hover svg': {
      cursor: 'pointer',
      fill: 'white'
    }
  }
}))

export default function DiscordCTA() {
  const classes = useStyles()
  return (
    <div
      style={{
        top: '100px',
        right: '0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '10px',
        borderRadius: '8px',
        marginRight: '20px',
        marginTop: '20px',
        color: 'white'
      }}
    >
      <div>
        <a target="_blank" href="https://discord.gg/UNXZhFVnrA">
          <h3
            style={{
              margin: '0px',
              marginBottom: '10px',
              marginRight: '10px'
            }}
          >
            Join Us On
          </h3>
        </a>
      </div>
      <div className={classes.discordCTA}>
        <a target="_blank" href="https://discord.gg/UNXZhFVnrA">
          <SiDiscord size="2.5em" color="#7289da" />
        </a>
      </div>
    </div>
  )
}
