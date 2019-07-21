# `<SidebarHeading>` component

A `<SidebarHeading>` component renders an item in the sidebar that will contain a *Heading* label and a link to a specified *URL*.

*It's important to notice that using this component outside the `<Sidebar>` component is senseless.*

Here you can find an example on how to use this component:

```vue
<template>
  ...
  <Sidebar>
    ...
    <SidebarHeading heading="Home" href="/"/>
    ...
  </Sidebar>
  ...
</template>
```

### `<SidebarHeading>` props

-   `heading`: A String that will be displayed as a heading text inside the sidebar item.
-   `href`: A String representing the URL that this items will link to.