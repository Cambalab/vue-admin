
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
   * Auth component
   */
  AUTH_CONTAINER_TITLE: 'Sign In',
  AUTH_LABEL_USERNAME: 'E-mail',
  AUTH_LABEL_PASSWORD: 'Password',
  AUTH_LABEL_SIGN_IN_BUTTON: 'Sign In',

  /**
   * Shared content inside List, Show, Create, Edit components
   */

  // Any View Title (List, Show, Create, Edit)
  RESOURCE_VIEW_TITLE: {
    with: ({ resourceName }) => `${resourceName}`
  },
  // Create action button
  RESOURCE_CREATE_BUTTON: 'add',

  // Edit action button
  RESOURCE_EDIT_BUTTON: 'edit',

  // Delete action button
  RESOURCE_DELETE_BUTTON: 'delete',

  // Create Save button
  CREATE_SUBMIT_BUTTON: 'save',

  // Edit Save button
  EDIT_SUBMIT_BUTTON: 'save'
}
