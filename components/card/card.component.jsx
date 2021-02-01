import React from 'react'
import Image from '../image/image.component'
import { Grid, Link, Typography, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345

  }
}))

const Card = ({ article }) => {
  const classes = useStyles();
  const imgStyles = {width: '150px', height: '100px', objectFit: 'cover'}
  return (
    <>
      <Link href={`/article/${article.slug}`} color='inherit'>
          <Grid container spacing={3}>
            <Grid item xs={5}>
                <Image style={imgStyles} image={article.image} />
            </Grid>
            <Grid item xs={7}>
              <Typography>{article.category.name}</Typography>
              <Typography variant='h6' component='h1'>{article.title}</Typography>
              <Typography>{article.author.name}</Typography>
              <Typography noWrap>{article.description}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
      </Link>
    </>



    // <Link as={`/article/${article.slug}`} href='/article/[id]'>
    //   <a className='uk-link-reset'>
    //     <div className='uk-card uk-card-muted'>
    //       <div className='uk-card-media-top'>
    //         <Image image={article.image} />
    //       </div>
    //       <div className='uk-card-body'>
    //         <p id='category' className='uk-text-uppercase'>
    //           {article.category.name}
    //         </p>
    //         <p id='title' className='uk-text-large'>
    //           {article.title}
    //         </p>
    //       </div>
    //     </div>
    //   </a>
    // </Link>
  )
}

export default Card
