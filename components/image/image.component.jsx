import { getStrapiMedia } from '../../lib/media'

const Image = ({ image, style }) => {
  let imageUrl
  let imageObj = image ? image : {}

  if (imageObj.url) {
    imageUrl = getStrapiMedia(imageObj)
  }

  return (
    <img
      src={imageUrl}
      alt={imageObj.alternativeText || imageObj.name}
      style={style}
    />
  )
}

Image.defaultProps = {
  image: null,
  style: {}
}

export default Image
