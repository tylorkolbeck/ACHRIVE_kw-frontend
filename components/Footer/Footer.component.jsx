import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import { Grid, Typography } from '@material-ui/core'
import { appLinks } from '../../lib/app.links'
import BodyText from '../../components/Typography/BodyText/BodyText.component'
import TextLink from '../../components/Typography/TextLink/TextLink.component'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
      background: theme.palette.grey[900],
      color: 'white',
      padding: theme.spacing(3)
    },
    link: {
      marginRight: theme.spacing(2),
      color: theme.custom.color.teal
    },
    caption: {
      marginTop: theme.spacing(10)
    }
  }
})

export default function Footer() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container justify="space-between">
        <Grid item>Copyright Killer Whale 2021</Grid>
        <Grid item>
          <Grid container>
            {appLinks.map((link) => (
              <Link href={link.url} key={link.label}>
                <a className={classes.link} key={link.label}>
                  {link.label}
                </a>
              </Link>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Typography variant="caption" className={classes.caption}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam qui
          a possimus fuga nostrum cum quod modi, suscipit, est numquam assumenda
          saepe quidem officia consequatur aperiam dolore similique. Facilis
          veritatis alias, distinctio eum fugit laborum adipisci in delectus
          reprehenderit sit deserunt, fuga, illum nemo aliquid qui maxime
          nostrum fugiat. Suscipit tempora ab voluptatum dolorum? Quibusdam
          necessitatibus natus dolorem praesentium quasi sint, voluptas quaerat
          similique omnis deleniti quisquam saepe eius sequi mollitia cumque
          minus cum iusto harum maxime? Natus fuga, iusto labore excepturi ea
          mollitia alias! Veniam omnis facere odit asperiores aliquam veritatis,
          consequuntur enim qui aliquid ab ratione vel pariatur?
        </Typography>
      </Grid>
    </div>
  )
}
