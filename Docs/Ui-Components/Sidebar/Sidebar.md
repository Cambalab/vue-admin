# `Sidebar`

A `Sidebar` component that wraps the Sidebar related custom components.

<p align="center">
  <img width="200" src="sidebar.png" alt="Vue Admin Sidebar" />
</p>
<br />

Here you can find an example on how to use this component and the available components that you can provide to it as children:

```vue
<template>
  <Sidebar>
    <SidebarHeading heading="Home" href="/"/>
    <SidebarNode title="Entities" icon="keyboard_arrow_up" icon-alt="keyboard_arrow_down">
      <SidebarLink title="Articles" path="/articles" icon="list" />
      <SidebarLink title="Magazines" path="/magazines" icon="list" />
      <SidebarLink title="Authors" path="/authors" icon="list" />
    </SidebarNode>
    <SidebarAction title="Sign Out" :action="logout" icon="power_settings_new" />
  </Sidebar>
</template>
...
```

As you've guessed a function `logout` must be defined in order to invoke it in the `SidebarAction` component.

A more detailed description of each related component can be found in their respective file:

## Related components

-   [SidebarHeading](Sidebar/SidebarHeading.md)
-   [SidebarAction](Sidebar/SidebarAction.md)
-   [SidebarLink](Sidebar/SidebarLink.md)
-   [SidebarNode](Sidebar/SidebarNode.md)
