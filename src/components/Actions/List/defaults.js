
/**
 * Defaults - Default attributes for the List view
 *
 * @return {Object} An object containing props and methods
 */
export default () => {
  const component = 'List'

  /**
   * Create View default validations
   */

  return {
    composer: {
      parentPropKeys: [
        'resourceName',
        'resourceIdName',
        'hasCreate',
        'hasShow',
        'hasEdit',
        'va'
      ],
      childrenAdapter: {
        alignContent: 'align',
        alignHeader: 'alignHeader',
        headerText: 'headerText',
        sortable: 'sortable',
        source: 'label'
      }
    }
  }
}
