# `Admin`

`Admin` is one of the core components. This component receives many of the properties provided by a user and dispatches them to the correspondent sub-components that will render them. Some of those properties are not required. When those properties are not provided, the `Admin` component will use a set of default ones.
It's main responsibility is to create an authentication route and store modules, decide whether a user is authenticated or not and finally render the proper component given an authentication scenario.

## props

### authProvider

+   **Type:** `Function`

+   **Details:** A function used to call different mutations in an authorization module. It is in fact the an adapter for a client (e.g.: axios) you'd like to use to perform requests to a server.

### authLayout

+   **Type:** `Object (optional)`

+   **Details:** A component that is used by the router whenever the store `isAuthenticated` getter returns `false`. When using your own authLayout, a va `Object` will be provided with a `login` function that receives two arguments: `{String} username`, `{String} password` and updates the store `isAuthenticated` state.

+   **Default:** `AuthLayout`

### options

+   **Type:** `Object`

+   **Details:** Allows users to provide their own store modules. Instead of providing an authProvider, an authModule can be passed to the instance. However, the module must contain the authProvider internally, it will be used as the authentication client.  
You can use the following options:  
    +   `authModule`: a vuex store object.

+   **Example:**

```js
const adminOptions = {
  authModule: {
    namespaced: true,
    actions: {
      ...
    },
    getters: {
      authStatus: state => state.status,
      isAuthenticated: state.isAuthenticated,
      getUser: state.user
    }
    mutations: {
      ...
    },
    state: {
      error: '',
      isAuthenticated: false,
      status: 'idle',
      user: {},
    }
  }
}
```

### sidebar

+   **Type:** `Object (optional)`

+   **Details:** A sidebar component that used by the `appLayout` prop. If you want to use your own sidebar, you might want to take a look at the [**Sidebar docs**](../Ui-Components/Sidebar.md).

+   **Default:** `DefaultSidebar`

### title

+   **Type:** `String (optional)`

+   **Details:** a string used by the `appLayout` as the toolbar title

+   **Default:** `Vue Admin`

### unauthorized

+   **Type:** `Object (optional)`

+   **Details:** A component that is used by the router whenever a user is not authorized to visit certain views.

+   **Default:** `Unauthorized`

## internal props

### appLayout

+   **Type:** `Object (default)`

+   **Details:** when a user is authenticated, `appLayout` is passed as prop to the `Authenticated` component.  

+   **Source:** `AppLayout`
