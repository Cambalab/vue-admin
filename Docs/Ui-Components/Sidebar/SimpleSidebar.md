# `SimpleSidebar`

This is a custom sidebar created using `Sidebar`, `SidebarHeading`,`SidebarAction`,`SidebarLink`,`SidebarNode` that can be exported from `vue-admin-js`. It's a little less customizable than building your own sidebar but it accepts a few useful props.

## internal props

### subscriptions

+   **Type:** `Array: Function`

+   **Details:** A list of functions. These are currently used to subscribe events to the store and eventually add items to the menu sidebar. These functions must take an `action: Function` that, in turn, take a `mutation: Object` and a `state: Object` (similar to vuex subsciptions). For example:
    > ```javascript
    > [
    >   action => (mutation, state) => {
    >     if (mutation.type === 'something') {
    >       state.someProp = action()
    >     }
    >   },
    > ]
    > ```

+   **Default:** A list of one function that adds a route to the store state every time a mutation is triggered:

    > ```javascript
    > [
    >   action => (mutation, state) => {
    >     const { namespace, RESOURCES_ADD_ROUTE } = ResourcesTypes
    >     if (mutation.type === `${namespace}/${RESOURCES_ADD_ROUTE}`) {
    >       const currentRoutes = state.resources.routes.map(route => {
    >         return { icon: 'list', title: route.name, link: route.path }
    >       })
    >       action(currentRoutes)
    >     }
    >   }
    > ]
    > ```

### va

+   **Type:** `Object`

+   **Details:** An object that contains user related functions that are exposed to layouts:
    +   `logout`: a function that implements the `auth/AUTH_LOGOUT_REQUEST` interface to call the `authModule`.
    +   `getUser`: a function that implements the `auth/AUTH_GET_USER` interface to call the `authModule`

    > Interfaces implementation can be found in `@va-auth/types`, while the `authModule` is a `@va-auth/store` module, and it's assigned by the `Admin` component.

+   **Default:** An object with the logout and getUser function that, in turn, use the `@va-auth/types`: `AUTH_LOGOUT_REQUEST`, `AUTH_GET_USER`
> The va object is designed in the `Authenticated` component.
> The `Authenticated` component defines the va object.

+   **Provided by:** [`AppLayout`](/Docs/Layouts/AppLayout)