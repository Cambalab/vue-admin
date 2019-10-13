# `Authenticated`

The `Authenticated` component is used by the `Admin` component. It can be understood as a wrapper of the main application layout whenever a truthy authentication state is present in the `Admin` component.

It's responsible of creating the unauthorized routes and rendering a Core component along with other application layouts.

## internal props

### appLayout

+   **Type:** `Object`

+   **Details:**  The `AppLayout` component is assigned by default in the `Admin` component's defaults file.

> Future feature: Admin should expose appLayout

## methods

### logout

+   **Details:** implements the `auth/AUTH_LOGOUT_REQUEST` interface from `@va-auth/types`

### getUser

+   **Details:** implements the `auth/AUTH_GET_USER` interface from `@va-auth/types`
