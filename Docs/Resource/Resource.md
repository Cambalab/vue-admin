# `Resource`

`Resource` is the main component for rendering the CRUD views. Some of it's properties are not required. When those properties are not provided, the `Resource` component will use a set of default ones.  
It's main responsibility is to create resource store modules, create new routes and bind CRUD components to those routes. A `Resource` does not render any visual component.

## props

### name

+   **Type:** `String`

+   **Details:** The name of your resource. This value should match your API resource name (e.g.: your-api-url/`name`)

### list

+   **Type:** `Object`

+   **Details:** A component that is used to render a list of resource elements

### show

+   **Type:** `Object (optional)`

+   **Details:** A component that is used to render a single resource element. If none provided the `show` route will not exist.

### create

+   **Type:** `Object (optional)`

+   **Details:** A component that is used to render a create view for a single resource element. If none provided the `create` route will not exist.

### edit

+   **Type:** `Object (optional)`

+   **Details:** A component that is used to render an edit view for a single resource element. If none provided the `edit` route will not exist.

### resourceIdName

+   **Type:** `String (optional)`

+   **Details:** A string that will be used to match the id of a resource. This is commonly used during network operations as well as internal store mutations and getter functions.

+   **Default:** `'id'`

### userPermissionsField

+   **Type:** `String (optional)`

+   **Details:** A string that is used to match permissions inside the `user` Object. This is mainly used during the router hooks to restrict/grant access to certain resource views.

+   **Default:** `'permissions'`

> This `user` Object is provided during the authentication and authorization process. See the `@va-auth` for more information.

### apiUrl

+   **Type:** `Object`

+   **Details:** A string that matches the url of your backend (e.g: `http://localhost:8888/api/`). Next to this url the `name` property will be used to request information from your backend services.

### redirect

+   **Type:** `Object (optional)`

+   **Details:** An object used to configure redirection. Whenever a submit action is triggered inside a `Create` or `Edit` view, Vue-Admin will look up the `redirect` object to trigger a router redirection.

+   **Default:** `Object`

  ```javascript
    {
      views: {
        create: 'list',
        edit: 'show',
      },
    }
  ```
  > Where a submit inside a `create` or `edit` view will trigger a redirection to the `list` component or the `show` respectively
  
### parseResponses
  
+   **Type:** `Object (optional)`
  
+   **Details:** An object with two attributes: `parseSingle` and `parseList`. Each of them should be functions that take a server response as argument and returns an `Object` with a `data` attribute where the fetched resource can be found.
  
+   **Default:** `Object`
  
  ```javascript
    {
      set parseList(response) {
        const { data } = response
        return Object.assign({}, response, { data })
      },
      set parseSingle(response) {
        const { data } = response
        return Object.assign({}, response, { data })
      },
    }
  ```

### subscriptions

+   **Type:** `Function (optional)`

+   **Details:** A function that takes the vuex store as an argument and returns an object of callback functions. This functions are passed during the `Resource` store module creation and they're commonly used to to intercept mutation events (e.g: during snackbar or alert notifications)

+   **Default:** `Function`

  ```js
    (store) => {
      return {
        onCreateSuccess: () => {
          store.commit(myMutation, args)
        },
        onDestroySuccess: () => {
          store.commit(myMutation, args)
        },
        onUpdateSuccess: () => {
          store.commit(myMutation, args)
        },
        onCreateError: () => {
          store.commit(myMutation, args)
        },
        onDestroyError: () => {
          store.commit(myMutation, args)
        },
        onFetchListError: () => {
          store.commit(myMutation, args)
        },
        onFetchSingleError: () => {
          store.commit(myMutation, args)
        },
        onUpdateError: () => {
          store.commit(myMutation, args)
        },
      }
  ```
  
  > Check the `@components/Resource/src/defaults.js` module for more information and the [**vuex-crud documentation page**](https://github.com/JiriChara/vuex-crud#advanced-usage) to know more about all available callbacks
