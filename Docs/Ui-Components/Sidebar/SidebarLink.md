# `SidebarLink`

A `SidebarLink` component renders an item in the sidebar that can be linked to an specific path in the application. Unlike the `SidebarHeading` component, this component should provide a path relative to this application for one of the declared `Resources`.

*It's important to notice that using this component outside the `<Sidebar>` component is senseless.*

Here you can find an example on how to use this component:

```vue
<template>
  ...
  <Sidebar>
    ...
    <SidebarLink title="Users" path="/users" icon="people" />
    ...
  </Sidebar>
  ...
</template>
```

### `SidebarLink` props

-   `title`: A String that will be displayed as title inside the sidebar item.
-   `path`: A String representing a relative path.
-   `icon`: A String representing the name of the [Material Icon](https://cdn.materialdesignicons.com/3.8.95/) to prepend in the Action item when the group is being displayed.
