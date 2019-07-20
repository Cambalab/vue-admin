# `<SidebarNode>` component

A `<SidebarNode>` component renders an item in the sidebar representing a group parent that on clicked event will toggle the visibility of its children items.

*It's important to notice that using this component outside the `<Sidebar>` component is senseless.*

Here you can find an example on how to use this component:

```vue
<template>
  ...
  <Sidebar>
    ...
    <SidebarNode title="Entities" icon="keyboard_arrow_up" icon-alt="keyboard_arrow_down">
      ...
    </SidebarNode>
    ...
  </Sidebar>
  ...
</template>
```

### `<SidebarNode>` props

-   `title`: A String that wil displayed as a title inside the sidebar item for this group.
-   `icon`: A String representing the name of the [Material Icon](https://material.io/icons/) to prepend in the Action item when the group is being displayed.
-   `icon-alt`: A String representing the name of the [Material Icon](https://material.io/icons/) to prepend in the Action item when the group is not being displayed.