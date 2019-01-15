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
      list: (args) => listRequest(args),
      create: (args) => createRequest(args),
      edit: (args) => editRequest(args)
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

    // Initialises endpoints
    routes.forEach(route => {
      initEndpoints[route.name](route)
    })
  })
}
