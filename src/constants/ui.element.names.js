
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
  RESOURCE_VIEW_CONTAINER_TITLE: {
    with: ({ resourceName, view }) => `${resourceName}-${view}-container-title`
  },

  RESOURCE_VIEW_CONTAINER_FIELDS: {
    with: ({ resourceName, view }) => `${resourceName}-${view}-container-fields`
  },

  RESOURCE_VIEW_CONTAINER_FIELD: {
    with: ({ resourceName, view, field }) => `${field}-${resourceName}-${view}-container-field`
  },

  // The button that redirects to a Create view
  RESOURCE_CREATE_BUTTON: {
    with: ({ resourceName }) => `${resourceName}-create-button`
  },
  // A specific container of a Resource field inside an element of List
  RESOURCE_VIEW_ELEMENT_FIELD: {
    with: ({ resourceName, view, field, index }) => {
      return index !== undefined
      ? `${resourceName}-${view}-element-${field}-${index}`
      : `${resourceName}-${view}-element-${field}`
    }
  },

  /**
   * Create
   */

   RESOURCE_CREATE_SUBMIT_BUTTON: {
     with: ({ resourceName, view }) => `${resourceName}-${view}-submit-button`
   }
}
