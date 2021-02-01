import React from 'react'
import Image from '../image/image.component'
import { Link, Typography } from '@material-ui/core'

const MainArticle = ({ latestArticle }) => {
  
  return (
    <>
    <Link href={`/article/${latestArticle.slug}`} color="inherit">
        <Image image={latestArticle.image} />
        <Typography variant='h3' component='h1'>{latestArticle.title}</Typography>
        <Typography>{latestArticle.author.name}</Typography>
        <Typography>{latestArticle.description}</Typography>
    </Link>
    </>
  )
}

export default MainArticle