
/**
 * Defaults - Default attributes for the Create view
 *
 * @return {Object} An object containing props and methods
 */
export default () => {
  const component = 'Create'

  /**
   * Create View default validations
   */

  return {
    composer: {
      parentPropKeys: [
        'resourceName',
        'redirect',
        'va'
      ],
      childrenAdapter: {
        placeHolder: 'placeHolder',
        source: 'label'
      }
    }
  }
}
