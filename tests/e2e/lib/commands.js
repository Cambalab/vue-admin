// Can't use aliases yet, without adding a custom webpack config, see https://github.com/vuejs/vue-cli/issues/2465 - @sgobotta
import Factory from '../factory'
import UI_NAMES from '../../../src/constants/ui.element.names'
import { createUrlWithResource, createElementQueryWith } from './helpers'
const { AUTH_LOGIN_REQUEST } = require('../../../src/va-auth/src/types')

const storePath = 'app.$store'

/**
 * InitEntityUtils - Initialises a set of functions to be used by a specific
 * test
 *
 * @param {String}   resourceName The name of a resource (magazines|articles|...)
 * @param {String}   view         The name of a view (show|create|edit|list)
 *
 * @return {Object} An object with common functions to search for elements in
 * the DOM
 */
export const InitEntityUtils = ({
  resourceName,
  view
}) => {
  return {

    /**
     * getUrlByResource - Given an object with parameters, returns the url
     * for a given resource
     *
     * @param {Object} args An object with parameters that override the default
     * ones
     *
     * @return {String} An url
     */
    getUrlByResource: (args = {}) => {
      return createUrlWithResource(args)
    },
    /**
     * getInputBy - Calls cypress to find an input element that matches the
     * given parameters
     *
     * @param {Object} args An object with parameters that override the default
     * ones
     *
     * @return {Object} An input element.
     */
    getInputBy: (args = {}) => {
      const _args = {
        constant: UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD,
        constantParams: {
          resourceName,
          view,
          field: args.field
        },
        elementProp: 'name',
        elementType: 'input'
      }
      return cy.getElement(Object.assign({}, _args, args))
    },

    /**
     * getSubmitButton - Calls cypress to find and return a button element that
     * matches the given parameters
     *
     * @param {Object} args An object with parameters that override the default
     * ones
     *
     * @return {Object} A button element.
     */
    getSubmitButton: (args = {}) => {
      const _args = {
        constant: UI_NAMES.RESOURCE_VIEW_SUBMIT_BUTTON,
        constantParams: {
          resourceName,
          view
        },
        elementProp: 'name',
        elementType: 'button'
      }
      return cy.getElement(Object.assign({}, _args, args))
    },

    /**
     * getTableRowBy - Calls cypress to find and return a row element that
     * matches the given parameters
     *
     * @param {Object} args An object with parameters that override the default
     * ones
     *
     * @return {Object} A td element
     */
    getTableRowBy: (args = {}) => {
      const _args = {
        constant: UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD,
        constantParams: {
          resourceName,
          view,
          field: args.field,
          index: args.index
        },
        elementProp: 'name',
        elementType: 'td'
      }
      return cy.getElement(Object.assign({}, _args, args))
    }
  }
}

/**
 * getElement - Given a set of data, builds a query to search for a DOM element
 * and calls Cypress to find it.
 *
 * @param {Object|String} constant       An predifined Object or String to get
 *                                       the name of an element in the DOM
 * @param {Object}        constantParams Parameters to be used by an Object type
 *                                       constant
 * @param {String}        elementType    The element type (input|button|...)
 * @param {String}        elementProp    The element property to look into,
 *                                       we usually use 'name'.
 *
 * @return {Object} An 'elementType' element from the DOM
 */
export const getElement = ({
  constant,
  constantParams,
  elementType,
  elementProp,
}) => {
  // Builds the name of the element using predefined constants
  const elementFieldName = (constant instanceof Object) || constantParams
    ? constant.with(constantParams)
    : constant
  // Creates the Cypress query
  const element = createElementQueryWith({
    type: elementType,
    prop: elementProp,
    value: elementFieldName
  })
  // Gets the 'elementType' element
  return cy.get(element)
}

export const getStore = () => cy.window().its(storePath)

export const authenticate = (args) => {
  getStore().then(store => {
    store.dispatch(`auth/${AUTH_LOGIN_REQUEST}`, args)
  })
}

export const InitAuthenticatedUser = ({ credentials = {}, authResponse = {} } = {}) => {
  const _credentials = Factory.createCredentials()
  const authParams = Object.assign({}, _credentials, credentials)
  const _response = Factory.createAuthResponse()
  const response = Object.assign({}, _response, authResponse)
  
  cy.visit('/#/login')
  cy.server()
  cy.route({
    method: 'POST',
    url: 'api/auth',
    response,
  }).as('auth')

  cy.authenticate(authParams).wait('@auth').then(xmlHttpRequest => {
    const { status } = xmlHttpRequest
    expect(status).to.equal(200)
  })
}
