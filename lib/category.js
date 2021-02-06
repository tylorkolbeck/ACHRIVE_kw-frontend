const API_URL = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}`

export async function getSortedCategories() {
  const response = await fetch(`${API_URL}/categories`)
  const categories = await response.json()

  return categories
}

export async function getAllCategoryNames() {
  const categories = await getSortedCategories()

  const categoryNames = categories.map((category) => ({
    params: {
      category: category.slug
    }
  }))
  return categoryNames
}

export async function getArticlesByCategory(category) {
  const response = await fetch(`${API_URL}/categories/${category}`)

  const articles = await response.json()

  return articles
}
