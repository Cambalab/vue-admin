import { VListItemAvatar, VAvatar, VIcon } from 'vuetify/lib'

/**
 * Defaults - Default attributes for the SidebarHeading view
 *
 * @return {Object} An object containing props and methods
 */
export default () => {
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
