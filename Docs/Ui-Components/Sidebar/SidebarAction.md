# `SidebarAction`

A `SidebarAction` component renders an item in the sidebar that can execute a certain action.

*It's important to notice that using this component outside the `Sidebar` component is senseless.*

Here you can find an example on how to use this component:

```vue
<template>
  ...
  <Sidebar>
    ...
    <SidebarAction title="Upload File" :action="uploadFile" icon="cloud_upload" />
    ...
  </Sidebar>
  ...
</template>
<script>
  ...
  methods: {
    uploadFile() {
      ...
    }
  }
  ...
</script>
```

### `SidebarAction` props

-   `title`: A String that will be displayed as a title inside the sidebar item for this action.
-   `action`: A Function that will be executed when the Action item is clicked.
-   `icon`: A String representing the name of the [Material Icon](https://cdn.materialdesignicons.com/3.8.95/) to prepend in the Action item.
