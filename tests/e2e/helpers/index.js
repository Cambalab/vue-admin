/**
 * Cypress Helpers
 */

// TODO: deprecate this file and use ../lib/helpers instead ^_^
 export default {
   queryElementByProp: ({ type = '', prop, value }) => `${type}[${prop}=${value}]`
 }
