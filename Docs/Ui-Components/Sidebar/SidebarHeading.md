# `SidebarHeading`

A `SidebarHeading` component renders a heading item in the sidebar.

*It's important to notice that not using this component as a `Sidebar` component child is senseless.*

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

## props

### avatar

+   **Type:** `Object`

+   **Description:** represents a Vue component that is be rendered at the left side of the sidebar heading.

+   **Default:** A functional component that given `color` and `content` as `avatarProps`, renders a `VListItemAvatar` component. More about [Vuetify avatar components](https://vuetifyjs.com/en/components/avatars). Example:

    > ```javascript
    > ...
    > avatar: {
    >   type: Object,
    >   default: () => ({
    >     name: 'SidebarHeadingAvatar',
    >     functional: true,
    >     render: function(h, context) {
    >       const { props } = context
    >       return (
    >         <VListItemAvatar>
    >           <VAvatar color={props.color}>{h(props.content)}</VAvatar>
    >         </VListItemAvatar>
    >       )
    >     },
    >   }),
    > },
    > ...
    > ```

### avatarProps

+   **Type:** `Object`

+   **Description:** An Object containing props to customize the `avatar` component.

+   **Default:** an object with props to be passed to the `avatar` prop component: `color: String` and `content: Object | VNode`. Example:

    > ```javascript
    > ...
    > avatarProps: {
    >   type: Object,
    >   default: () => ({
    >     color: 'teal',
    >     content: AccountIcon,
    >   }),
    > },
    > ...
    > const AccountIcon = {
    >   name: 'AccountIcon',
    >   render: function(h) {
    >     return <VIcon dark>account_circle</VIcon>
    >   },
    > }
    > ```

### title

+   **Type:** `String`

+   **Description:** A String that will be displayed as title inside the sidebar item.

+   **Default:** `'Menu'`

### subTitle

+   **Type:** `String`

+   **Description:** A String that will be displayed as title inside the sidebar item.

+   **Default:** `''`
