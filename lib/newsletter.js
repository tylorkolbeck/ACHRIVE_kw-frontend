import axios from 'axios'

const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'

export const alreadySubscribed = (email) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/newsletter-contacts/${email}`)
      .then((res) => {
        resolve(`You've already subscribed!`)
      })
      .catch((error) => {
        reject(error)
        // if reject then we can post the newsletter email
      })
  })
}

export const postNewsletterEmail = (email) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/newsletter-contacts`, { email: email })
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
