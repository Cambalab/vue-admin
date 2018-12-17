/**
 * Cypress Helpers
 */

 export default {
   queryElementByProp: ({ type = '', prop, value }) => `${type}[${prop}=${value}]`
 }
