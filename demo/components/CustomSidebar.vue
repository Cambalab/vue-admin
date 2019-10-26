<template>
  <Sidebar>
    <SidebarHeading :avatarProps="avatarProps" :title="title" />
    <SidebarNode
      title="Entities"
      icon="keyboard_arrow_up"
      icon-alt="keyboard_arrow_down"
    >
      <SidebarLink title="Articles" path="/articles" icon="list" />
      <SidebarLink title="Magazines" path="/magazines" icon="list" />
      <SidebarLink title="Authors" path="/authors" icon="list" />
    </SidebarNode>
    <SidebarAction
      title="Sign Out"
      :action="logout"
      icon="power_settings_new"
    />
  </Sidebar>
</template>
<script>
import {
  Sidebar,
  SidebarLink,
  SidebarNode,
  SidebarAction,
  SidebarHeading,
} from '@components/UiComponents'

const CustomAvatar = {
  name: 'CustomAvatar',
  // eslint-disable-next-line
  render(h) {
    return <img src="https://randomuser.me/api/portraits/thumb/women/23.jpg" />
  },
}

export default {
  name: 'CustomSidebar',
  components: {
    Sidebar,
    SidebarLink,
    SidebarNode,
    SidebarAction,
    SidebarHeading,
  },
  data() {
    return {
      title: this.va.getUser().email,
      avatarProps: {
        content: CustomAvatar,
      },
    }
  },
  props: {
    va: {
      type: Object,
      required: true,
    },
  },
  methods: {
    logout() {
      return this.va.logout()
    },
  },
}
</script>
