
export default {

  /**
   * UI component
   */
  MAIN_TOOLBAR_TITLE: 'main-toolbar-title',
  MAIN_TOOLBAR_USER_AVATAR: 'main-toolbar-user-avatar',
  DRAWER_BUTTON: 'va-drawer-activator',
  DRAWER_RESOURCE_TILE: {
    with: ({ resourceName }) => `drawer-${resourceName}-tile`
  },

  /**
   * Auth component
   */

   AUTH: 'va-login',
   AUTH_CONTAINER: 'va-login-container',
   AUTH_CONTAINER_TITLE: 'va-login-container-title',
   AUTH_USERNAME_INPUT: 'va-login-username',
   AUTH_PASSWORD_INPUT: 'va-login-password',
   AUTH_SIGN_IN_BUTTON: 'va-login-submit-button',

  /**
   * Custom Auth component
   */

  CUSTOM_AUTH: 'va-custom-auth',
  CUSTOM_AUTH_CONTAINER: 'va-login-container',
  CUSTOM_AUTH_CONTAINER_TITLE: 'va-login-container-title',
  CUSTOM_AUTH_USERNAME_INPUT: 'va-login-username',
  CUSTOM_AUTH_PASSWORD_INPUT: 'va-login-password',
  CUSTOM_AUTH_SIGN_IN_BUTTON: 'va-login-submit-button',

  /**
   * Actions
   */

  // The whole container of a Resource List
  RESOURCE_VIEW_CONTAINER: {
    with: ({ resourceName, view }) => `${resourceName}-${view}-container`
  },

  RESOURCE_VIEW_ACTIONS_CONTAINER: {
    with: ({ resourceName, view }) => `${resourceName}-${view}-actions-container`
  },

  RESOURCE_VIEW_CONTAINER_TITLE: {
    with: ({ resourceName, view }) => `${resourceName}-${view}-container-title`
  },

  RESOURCE_VIEW_CONTAINER_FIELDS: {
    with: ({ resourceName, view, index }) => {
      return index !== undefined
      ? `${resourceName}-${view}-container-fields-${index}`
      : `${resourceName}-${view}-container-fields`
    }
  },

  RESOURCE_VIEW_CONTAINER_FIELD: {
    with: ({ resourceName, view, field }) => `${field}-${resourceName}-${view}-container-field`
  },

  // The button that redirects to a Create view
  RESOURCE_CREATE_BUTTON: {
    with: ({ resourceName }) => `${resourceName}-create-button`
  },
  // The button that redirects to a Edit view
  RESOURCE_EDIT_BUTTON: {
    with: ({ resourceName, index }) => {
      return index !== undefined
      ? `${resourceName}-edit-button-${index}`
      : `${resourceName}-edit-button`
    }
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

   RESOURCE_VIEW_SUBMIT_BUTTON: {
     with: ({ resourceName, view }) => `${resourceName}-${view}-submit-button`
   },

  /**
   * Edit
   */

   RESOURCE_EDIT_SUBMIT_BUTTON: {
     with: ({ resourceName, view }) => `${resourceName}-${view}-edit-button`
   },

   RESOURCE_DELETE_BUTTON: {
     with: ({ resourceName, index }) => {
       return index !== undefined
       ? `${resourceName}-delete-button-${index}`
       : `${resourceName}-delete-button`
     }
   },

  /**
   * Unauthorized
   */
   UNAUTHORIZED_HEADER_CONTAINER: 'va-unauthorized-header-container',
   UNAUTHORIZED_MESSAGE_CONTAINER: 'va-unauthorized-message-container',

  /**
   * Other Buttons
   */
  BUTTON_GO_BACK: 'va-go-back-button',

  /**
   * Default Spinner
   */
  SPINNER_CONTAINER: 'spinner-container'
}
