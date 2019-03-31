import { numbers } from '../factory/utils'

/**
 * Anonymous Function - Given a resourceName and a view, initialises the
 * Cypress server with a stubbed route.
 *
 * @param {String} resourceName The resource name used to build the request url
 * @param {Array}  routes       An array of routes with name and an optional
 *                              response to initialise stubbed endpoints
 */
export default ({
  resourceName,
  routes
}) => {
  // Initialises the Cypress server
  cy.server()
  // Gets the {resourceName} fixture
  cy.fixture(resourceName).then(fixture => {
    let data = fixture

    // New endpoints should be added here
    const initEndpoints = {
      list: listRequest,
      create: createRequest,
      edit: editRequest,
      show: showRequest,
      delete: deleteRequest,
      auth: authRequest,
    }

    /**
     * listRequest - A stub for GET Many requests
     */
    function listRequest({ response }) {
      cy.route({
        method: 'GET',
        url: `api/${resourceName}/`,
        response: response || data
      }).as(`${resourceName}/list`)
    }

    /**
     * createRequest - A stub for POST requests
     */
    function createRequest({ response }) {
      const entity = response
      entity.id = numbers.randomBetween(1, 250000)
      cy.route({
        method: 'POST',
        url: `**/api/${resourceName}/`,
        status: 201,
        onRequest: () => {
          data.push(entity)
        },
        response: entity
      }).as(`${resourceName}/create`)
    }

    /**
     * editRequest - A stub for PATCH requests
     */
    function editRequest({ response }) {
      cy.route(
        'PATCH',
        `**/api/${resourceName}/*`,
        response,
        {
          onRequest: () => {
            data = data.filter(element => response.id !== element.id)
            data.push(response)
          }
        }
      ).as(`${resourceName}/update`)
    }

    /**
     * showRequest - A stub for GET Many requests
     */
    function showRequest({ response }) {
      cy.route(
        'GET',
        `api/${resourceName}/${response.id}`,
        response
      ).as(`${resourceName}/show/${response.id}`)
    }

    /**
     * deleteRequest - A stub for DELETE Many requests
     */
    function deleteRequest({ response }) {
      const resource = data.find(a => a.id === response.id)
      const index = data.indexOf(resource)
      data.splice(index,1)
      cy.route({
        method: 'DELETE',
        url: `api/${resourceName}/${response.id}`,
        response: {},
        status: 202
      }).as(`${resourceName}/delete/${response.id}`)
    }

    // Initialises endpoints
    routes.forEach(route => {
      initEndpoints[route.name](route)
    })
  })
}
