
/**
 * Defaults - Default attributes for the Show view
 *
 * @return {Object} An object containing props and methods
 */
export default () => {
  /**
   * Show View default composer options
   */
   const composer = {
     parentPropKeys: ['resourceName', 'redirect', 'va'],
     componentPropKeys: [],
     childrenAdapter: { placeHolder: 'placeHolder', source: 'label' }
   }

  return {
    composer
  }
}
