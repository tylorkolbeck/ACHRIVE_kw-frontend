import { getStrapiURL } from './api'

export function getStrapiMedia(media) {
  if (media) {
    const imageUrl = media.url.startsWith('/')
      ? getStrapiURL(media.url)
      : media.url
    return imageUrl
  } else {
    // Failsafe if media is undefined return an empty string or else the build fails
    return ''
  }
}
