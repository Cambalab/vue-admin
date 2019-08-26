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
    +   `login`: a function used to call the `authModule`
    > The `Authenticated` component defines the va object. `authModule` is a `@va-auth/store` module assigned in `Admin`.

+   **Default:** An object with the login and getUser function that, in turn, use the `@va-auth/types`: `AUTH_LOGOUT_REQUEST`, `GET_USER_REQUEST`
> The va object is assigned by the `Authenticated` component.