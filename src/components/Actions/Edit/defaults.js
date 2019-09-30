/**
 * Defaults - Default attributes for the Edit view
 *
 * @return {Object} An object containing props and methods
 */
export default () => {
  /**
   * Edit View default composer options
   */
  const composer = {
    parentPropKeys: ['resourceName', 'va'],
    childrenAdapter: {
      placeHolder: 'placeHolder',
      source: 'label',
      type: 'type',
    },
  }

  return {
    composer,
  }
}
