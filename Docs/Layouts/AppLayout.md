# AppLayout

`AppLayout` is used as default to `appLayout` prop in the `Admin` component. It defines how most of the vue admin visual components are rendered.

## props

### sidebar

+   **Type:** `Sidebar`

+   **Details:** a `Sidebar` component from the `@va-ui` module.

+   **Default:** `DefaultSidebar`
    > Note that it's currently assigned by `Admin`. Soon to be moved to `AppLayout` defaults.

### title

+   **Type:** `String`

+   **Details:** a text used by the `v-app-bar` as a `v-toolbar-title`.

+   **Default:** `VAppBar`

## internal props

### va

+   **Type:** `Object`

+   **Details:** It's just an object that contains user related functions tha are exposed to layouts:
    +   `logout`: a function that implements the `auth/AUTH_LOGOUT_REQUEST` interface to call the `authModule`.
    +   `getUser`: a function that implements the `auth/AUTH_GET_USER` interface to call the `authModule`
    
    > Interfaces implementation can be found in `@va-auth/types`, while the `authModule` is a `@va-auth/store` module, and it's assigned by the `Admin` component.

+   **Default:** An object with the logout and getUser function that, in turn, use the `@va-auth/types`: `AUTH_LOGOUT_REQUEST`, `AUTH_GET_USER`
> The va object is designed in the `Authenticated` component.
> The `Authenticated` component defines the va object. 
