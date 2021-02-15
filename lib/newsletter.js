import axios from 'axios'

const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'

export const postNewsletterEmail = (email) => {
  return axios.post(`${API_URL}/newsletter`, { email: email })
}
