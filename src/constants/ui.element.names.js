
export default {

  /**
   * UI component
   */
  MAIN_TOOLBAR_TITLE: 'main-toolbar-title',
  MAIN_TOOLBAR_USER_AVATAR: 'main-toolbar-user-avatar',
  DRAWER_RESOURCE_TILE: {
    with: ({ resourceName }) => `drawer-${resourceName}-tile`
  },

  /**
   * List
   */
  // The whole container of a Resource List
  RESOURCE_VIEW_CONTAINER: {
    with: ({ resourceName, view }) => `${resourceName}-${view}-container`
  },
  // The button that redirects to a Create view
  RESOURCE_CREATE_BUTTON: {
    with: ({ resourceName }) => `${resourceName}-create-button`
  },
  // The container of every element of a List
  RESOURCE_VIEW_ELEMENT_CONTAINER: {
    with: ({ resourceName, view, index }) => `${resourceName}-${view}-element-container-${index}`
  },
  // A specific container of a Resource field inside an element of the List
  RESOURCE_VIEW_ELEMENT_FIELD: {
    with: ({ resourceName, view, field, index }) => `${resourceName}-${view}-element-${index}-${field}`
  }
}
