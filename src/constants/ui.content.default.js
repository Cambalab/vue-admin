
export default {

  MAIN_TITLE: 'vue-admin',

  /**
   * UI component
   */
  // The Admin name in the Toolbar
  MAIN_TOOLBAR_TITLE: 'Vue Admin',
  // The user name in the Toolbar
  MAIN_TOOLBAR_USER_AVATAR_NAME: 'Juan',

  /**
   * Shared content inside List, Show, Create, Edit components
   */

  // Any View Title (List, Show, Create, Edit)
  RESOURCE_VIEW_TITLE: {
    with: ({ resourceName }) => `${resourceName}`
  },
  // Create action button
  RESOURCE_CREATE_BUTTON: 'add',

  // Create action button
  RESOURCE_EDIT_BUTTON: 'edit',

  // Create Save button
  CREATE_SUBMIT_BUTTON: 'save'
}
