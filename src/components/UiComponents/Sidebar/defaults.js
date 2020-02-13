import { VListItemAvatar, VAvatar, VIcon } from 'vuetify/lib'
import { Types as ResourcesTypes } from '@store/modules/resources'

/**
 * Defaults - Default attributes for the SimpleSidebar view
 *
 * @return {Object} An object containing props and methods
 */
export default () => {
  const menuItems = [
    {
      icon: 'keyboard_arrow_up',
      'icon-alt': 'keyboard_arrow_down',
      title: 'Resources',
      children: [],
      model: {},
      value: true,
    },
  ]

  const subscriptions = [
    action => (mutation, state) => {
      const { namespace, RESOURCES_ADD_ROUTE } = ResourcesTypes
      if (mutation.type === `${namespace}/${RESOURCES_ADD_ROUTE}`) {
        const currentRoutes = state.resources.routes.map(route => {
          return { icon: 'list', title: route.name, link: route.path }
        })
        action(currentRoutes)
      }
    }
  ]

  return {
    data: {
      menuItems
    },
    props: {
      subscriptions
    }
  }
}

/**
 * Defaults - Default attributes for the SidebarHeading view
 *
 * @return {Object} An object containing props and methods
 */
export const sidebarHeadingDefaults = () => {
  const avatar = Avatar
  const avatarProps = {
    color: 'teal',
    content: AccountIcon,
  }
  const title = 'Menu'
  const subTitle = ''

  return {
    props: {
      avatar,
      avatarProps,
      title,
      subTitle,
    },
  }
}

const AccountIcon = {
  name: 'AccountIcon',
  // eslint-disable-next-line
  render: function(h) {
    return <VIcon dark>account_circle</VIcon>
  },
}

const Avatar = {
  name: 'SidebarHeadingAvatar',
  functional: true,
  // eslint-disable-next-line
  render: function(h, context) {
    const { props } = context
    return (
      <VListItemAvatar>
        <VAvatar color={props.color}>{h(props.content)}</VAvatar>
      </VListItemAvatar>
    )
  },
}
