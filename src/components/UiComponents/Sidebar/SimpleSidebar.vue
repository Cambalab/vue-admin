<template>
  <Sidebar>
    <SidebarHeading />
    <template v-for="(item, index) in menuItems">
      <SidebarNode
        v-if="item.children"
        :key="index"
        :title="item.title"
        icon="keyboard_arrow_up"
        icon-alt="keyboard_arrow_down"
      >
        <SidebarLink
          v-for="(child, i) in item.children"
          :key="i"
          :title="child.title"
          :path="child.link"
          :icon="child.icon"
        />
      </SidebarNode>

      <SidebarLink
        v-else-if="item.link"
        :key="item.title"
        :title="item.title"
        :path="item.link"
        :icon="item.icon"
      />

      <SidebarAction
        v-else-if="item.click"
        :key="item.title"
        :title="item.title"
        :action="item.click"
        :icon="item.icon"
      />
    </template>
  </Sidebar>
</template>

<script>
import defaults from './defaults'
import {
  Sidebar,
  SidebarNode,
  SidebarLink,
  SidebarAction,
  SidebarHeading,
} from '../Sidebar'

export default {
  name: 'SimpleSidebar',
  components: {
    Sidebar,
    SidebarNode,
    SidebarLink,
    SidebarAction,
    SidebarHeading,
  },
  props: {
    va: Object,
    subscriptions: {
      type: Array,
      default: () => defaults().props.subscriptions,
    },
  },
  data() {
    return {
      menuItems: [
        ...defaults().data.menuItems,
        {
          click: () => this.va.logout(),
          icon: 'power_settings_new',
          title: 'Sign Out',
        },
      ],
    }
  },
  mounted() {
    this.mapCurrentRegisteredRoutes()
  },
  methods: {
    // Listen to addRoutes mutations
    mapCurrentRegisteredRoutes() {
      this.subscriptions.forEach(subscription => {
        this.$store.subscribe(
          subscription(currentRoutes => {
            this.menuItems[0].children = currentRoutes
          })
        )
      })
    },
  },
}
</script>
