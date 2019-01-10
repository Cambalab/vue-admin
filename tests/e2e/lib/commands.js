// Can't use aliases yet, without adding a custom webpack config, see https://github.com/vuejs/vue-cli/issues/2465 - @sgobotta
const UI_NAMES = require('../../../src/constants/ui.element.names')
const {
  createUrlWithResource,
  createElementQueryWith
} = require('./helpers')

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
      const buttonConstants = {
        create: UI_NAMES.RESOURCE_CREATE_SUBMIT_BUTTON,
        edit: UI_NAMES.RESOURCE_EDIT_SUBMIT_BUTTON
      }
      const _args = {
        constant: buttonConstants[args.submitType],
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
