import { createCredentials, createUser } from './auth'
import createStoreWith from './store'
import { createCrudModule } from './store/modules'
import { createAuthProvider } from './admin'

export default {
  createAuthProvider,
  createCredentials,
  createCrudModule,
  createStoreWith,
  createUser,
}
