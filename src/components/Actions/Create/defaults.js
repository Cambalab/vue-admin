
/**
 * Defaults - Default attributes for the Create view
 *
 * @return {Object} An object containing props and methods
 */
export default () => {
  /**
   * Create View default validations
   */
  const composer = {
    parentPropKeys: ['resourceName', 'redirect', 'va'],
    componentPropKeys: [],
    childrenAdapter: {
      placeHolder: 'placeHolder',
      source: 'label',
      type: 'type'
    }
  }

  return {
    composer
  }
}
