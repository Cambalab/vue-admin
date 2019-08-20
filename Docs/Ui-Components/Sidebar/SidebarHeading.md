# `SidebarHeading`

A `SidebarHeading` component renders a heading item in the sidebar.

*It's important to notice that using this component outside the `<Sidebar>` component is senseless.*

Here's a usage example:

```vue
<template>
  ...
  <Sidebar>
    ...
    <SidebarHeading
      title="Home"
      subTitle="is where the heart is"
      :avatar="avatar"
      :avatarProps="avatarProps"
    />
    ...
  </Sidebar>
  ...
</template>
```

### `SidebarHeading` props

-   `title`: A String that will be displayed as title inside the sidebar item.
-   `subTitle`: A String that will be displayed as subTitle inside the sidebar item.
-   `avatar`: An Object representing a Vue Object that can be rendered at the left side of the sidebar heading.
-   `avatarProps`: An Object containing props to customize the default avatar provided.
