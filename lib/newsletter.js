import axios from 'axios'

const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'

export const submitNewsletterEmail = (email) => {
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
