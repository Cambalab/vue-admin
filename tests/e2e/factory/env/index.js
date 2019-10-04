export const createApiUrl = ({ url, port, route }) => {
  const address = {}
  address.url = url || 'http://localhost'
  address.port = port || '8080'
  address.route = route || ''
  return `${address.url}:${address.port}/${address.route}`
}
