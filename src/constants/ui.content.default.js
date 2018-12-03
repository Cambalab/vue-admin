
export default {

  MAIN_TITLE: 'vue-admin',

  /**
   * UI component
   */
  MAIN_TOOLBAR_TITLE: 'Admin XXX',
  MAIN_TOOLBAR_USER_AVATAR_NAME: 'Juan',

  /**
   * List, Create, Edit views
   */

  // View Title
  RESOURCE_VIEW: {
    with: ({ resourceName, view }) => `${resourceName} resource: ${view} operation`
  },
  // Create action button
  CREATE_RESOURCE_BUTTON: {
    with: ({ resourceName }) => `Create ${resourceName}`
  }
}
