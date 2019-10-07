# `Unauthenticated`

The `Unauthenticated` component is used by the `Admin` component. It's just a wrapper for the provided `authLayout` whenever a falsy authentication state is present in the `Admin` component.

It's responsible of rendering a component that represents the authentication view.

> The authentication route `/login` is currently defined in the `Admin/defaults`.

## props

### layout

+   **Type:** `Object`

+   **Details:**  A view that is used for user authentication, corresponding to the `/login` route.

+   **Default:** The `Auth` layout.

## methods

### login

+   **Details:** implements the `auth/AUTH_LOGIN_REQUEST` interface from `@va-auth/types`
