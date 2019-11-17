# `Admin/Composer`

The `Composer` wrapper for the `Admin` is nothing more than a functional component that receives an `authProvider` and `options` to render an `Admin` component. By default, the `authProvider` prop will be fed to `@va-auth/store` to obtain a store module that implements `@va-auth/types`.

## props

### authLayout

+   **Type:** `Object (optional)`

+   **Details:** A component to log in that is passed as prop to `Admin`

### authProvider

+   **Type:** `Function`

+   **Details:** a function that implements the `@va-auth/types`.

+   **Example:** [**va-auth-axios-adapter**](https://github.com/Cambalab/va-auth-axios-adapter)

### options

+   **Type:** `Object`

+   **Details:** An object with options that are passed as props to `Admin`:
    +   `authModule`: a vuex store `Object` with properties: `namespaced: true`, state, actions, mutations and getters.  
        > Corresponds to the `@va-auth` module.

### sidebar

+   **Type:** `Object (optional)`

+   **Details:** A sidebar component that is passed as prop to `Admin`
