/**
 * Defaults - Default attributes for the List view
 *
 * @return {Object} An object containing props and methods
 */
export default () => {
  /**
   * List View default composer options
   */
  const composer = {
    parentPropKeys: [
      'resourceName',
      'resourceIdName',
      'hasCreate',
      'hasShow',
      'hasEdit',
      'va',
    ],
    childrenAdapter: {
      alignContent: 'align',
      alignHeader: 'alignHeader',
      headerText: 'headerText',
      sortable: 'sortable',
      source: 'label',
    },
  }

  return {
    composer,
  }
}
