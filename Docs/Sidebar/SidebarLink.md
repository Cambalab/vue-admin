# `<SidebarLink>` component

A `<SidebarLink>` component renders an item in the sidebar that will link to an specific path in the application. Unlike the `<SidebarHeading>` component, this component should provide a path relative to this application for one of the declared `Resources`.

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

### `<SidebarLink>` props

-   `title`: A String that wil displayed as a title inside the sidebar item for this link.
-   `path`: A String representing the relative path that this element will link to on clicked event.
-   `icon`: A String representing the name of the [Material Icon](https://material.io/icons/) to prepend in the Action item when the group is being displayed.
