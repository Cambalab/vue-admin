import { ipsum, numbers } from './utils'
import { store } from './store'

const createVuexCrudInitialState = () => {
  return store.createVuexCrudInitialState()
}

const createArticle = (args = {}) => {
  // Shortens the paragraph
  const title = ipsum.generateSentence()
  const content = ipsum.generateParagraph({ useStartingSentence: true })
  const _args = {
    title,
    content
  }
  return Object.assign({}, _args, args)
}

const createMagazine = (args = {}) => {
  const name = ipsum.generateSentence()
  const issue = `#${numbers.randomBetween(1, 500)}`
  const publisher = ipsum.generateParagraph(1, { useStartingSentence: true })
  const _args = {
    name,
    issue,
    publisher
  }
  return Object.assign({}, _args, args)
}

const apiUrl = ({ url, port, route }) => {
  const address = {}
  address.url  = url || 'http://localhost'
  address.port = port || '8080'
  address.route = route || ''
  return `${address.url}:${address.port}/${address.route}`
}

export default {
  createVuexCrudInitialState,
  createArticle,
  createMagazine,
  apiUrl
}
