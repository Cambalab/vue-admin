# `SidebarNode`

A `SidebarNode` component renders an item in the sidebar representing a group parent that on clicked event will toggle the visibility of its children items.

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

## props

### title

+   **Type:** `String` *(optional)*

+   **Description:** A `String` that will be displayed as title inside the sidebar item.

### icon

+   **Type:** `String` *(optional)*

+   **Description:** A `String` representing the name of the [Material Icon](https://cdn.materialdesignicons.com/3.8.95/) to prepend in the Action item when the group is being displayed.

### iconAlt

+   **Type:** `String` *(optional)*

+   **Description:** A `String` representing the name of the [Material Icon](https://cdn.materialdesignicons.com/3.8.95/) to prepend in the Action item when the group is being displayed.
