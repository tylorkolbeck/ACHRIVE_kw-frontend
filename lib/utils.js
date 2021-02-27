export default function capitalizeFirstLetter(string) {
  if (!string) {
    return string
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function groupBy(data, property) {
  return DataTransfer.reduce((acc, obj) => {
    let key = obj[property]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {})
}

export function makeid(length) {
  var result = ''
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
