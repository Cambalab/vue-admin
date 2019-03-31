import { ipsum, numbers } from './utils'
import { store } from './store'

/**
 * Store Methods
 */

const createInitialVuexStoreState = () => {
  return store.createInitialVuexStoreState()
}

const createInitialVuexStoreGetters = () => {
  return store.createInitialVuexStoreGetters()
}

/**
 * Entities Methods
 */

const createAuthResponse = (args = {}) => {
  const _args = {
    status: 200,
  }
  return Object.assign({}, _args, args)
}

const createCredentials = (args = {}) => {
  const username = 'dev@camba.coop'
  const password = '123456'
  const _args = {
    username,
    password
  }
  return Object.assign({}, _args, args)
}

const createUser = (args = {}) => {
  const id = 234567
  const email = 'dev@camba.coop'
  const permissions = ['admin']
  const _args = {
    id,
    email,
    permissions,
  }
  return Object.assign({}, _args, args)
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

/**
 * API related Methods
 */

const apiUrl = ({ url, port, route }) => {
  const address = {}
  address.url  = url || 'http://localhost'
  address.port = port || '8080'
  address.route = route || ''
  return `${address.url}:${address.port}/${address.route}`
}

/**
 * Exported Factory
 */

export default {
  // Store methods
  createInitialVuexStoreState,
  createInitialVuexStoreGetters,
  // Entities methods
  createArticle,
  createMagazine,
  // Auth methods
  createAuthResponse,
  createCredentials,
  createUser,
  // API related methods
  apiUrl
}
