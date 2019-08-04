<template>
  <Sidebar>
    <SidebarHeading :avatar="avatarUrl" heading="Menu" href="/" />
    <SidebarNode title="Entities" icon="keyboard_arrow_up" icon-alt="keyboard_arrow_down">
      <SidebarLink title="Articles" path="/articles" icon="list" />
      <SidebarLink title="Magazines" path="/magazines" icon="list" />
      <SidebarLink title="Authors" path="/authors" icon="list" />
    </SidebarNode>
    <SidebarAction title="Sign Out" :action="logout" icon="power_settings_new" />
  </Sidebar>
</template>
<script>
import { Sidebar, SidebarLink, SidebarNode, SidebarAction, SidebarHeading } from '@components/UiComponents'

export default {
  name: 'CustomSidebar',
  components: {
    Sidebar, SidebarLink, SidebarNode, SidebarAction, SidebarHeading
  },
  data() {
    return {
      avatarUrl: 'https://randomuser.me/api/portraits/thumb/women/23.jpg'
    }
  },
  props: {
    va: {
      type: Object,
      required: true
    }
  },
  methods: {
    logout() {
      return this.va.logout()
    }
  }
}
</script>
