/**
 * Command Helpers
 */

export default {
  createElementQueryWith: ({ type = '', prop, value }) =>
    `${type}[${prop}=${value}]`,

  createUrlWithResource: ({ resourceName, path = '' }) =>
    `${Cypress.config().baseUrl}#/${resourceName}/${path}`,
}
