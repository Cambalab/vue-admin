import { createCrudModule as _createCrudModule } from '@store/modules'
import defaults from '@components/Resource/src/defaults'

export const createCrudModule = args => {
  const apiUrl = 'localhost/api/'
  return _createCrudModule({
    apiUrl,
    resourceName: 'resource',
    resourceIdName: 'id',
    parseResponses: defaults().props.parseResponses,
    ...args,
  })
}
