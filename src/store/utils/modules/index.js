import createCrudModule from "vuex-crud";

/**
 * Modules utils - Given a set of data, creates a vuex crud module and calls
 * the store to register a new module.
 *
 * @param {String} apiUrl         The api url for a 'resourceName' resource
 * @param {String} resourceName   The name of the resource
 * @param {String} resourceIdName The name of the id property of a resource
 * @param {Object} parseResponses An object containing a parseSingle function
 * and a parseList function to be used by Vuex Crud.
 * @param {Object} store          The global Vuex store variable
 */
export default ({
  apiUrl,
  resourceName,
  resourceIdName,
  parseResponses,
  store
}) => {
  const customUrlFn = (id) => {
    const rootUrl =`${apiUrl}${resourceName}/`
    return id ? `${rootUrl}${id}` : rootUrl
  }
  const module = createCrudModule({
    resource: resourceName,
    customUrlFn,
    idAttribute: resourceIdName,
    ...parseResponses
  });
  store.registerModule(resourceName, module);
}
