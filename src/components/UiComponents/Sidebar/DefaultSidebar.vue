<template>
  <Sidebar>
    <template v-for="(item, index) in menuItems">
      <SidebarNode v-if="item.children" :key="index"
        :title="item.title"
        icon="keyboard_arrow_up"
        icon-alt="keyboard_arrow_down"
      >
        <SidebarLink v-for="(child, i) in item.children" :key="i"
          :title="child.title" :path="child.link" :icon="child.icon"
        />
      </SidebarNode>

      <SidebarLink v-else-if="item.link" :key="item.title"
        :title="item.title" :path="item.link" :icon="item.icon"
      />

      <SidebarAction v-else-if="item.click" :key="item.title"
        :title="item.title" :action="item.click" :icon="item.icon"
      />
    </template>
  </Sidebar>
</template>

<script>
import {
  Sidebar,
  SidebarNode,
  SidebarLink,
  SidebarAction
} from '@components/UiComponents'

export default {
  name: 'DefaultSidebar',
  components: {
    Sidebar,
    SidebarNode,
    SidebarLink,
    SidebarAction
  },
  props: {
    va: Object
  },
  data() {
    return {
      menuItems: [
        {
          click: () => {},
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          title: 'Resources',
          children: [],
          model: {},
          value: true,
        },
        {
          click: () => this.va.logout(),
          icon: 'power_settings_new',
          title: 'Sign Out',
        }
      ],
    }
  },
  mounted() {
    this.mapCurrentRegisteredRoutes()
  },
  methods: {
    // Listen to addRoutes mutations
    mapCurrentRegisteredRoutes() {
      let whitelist = ['resources/addRoute'];
      this.$store.subscribe((mutation, state) => {
        if (whitelist.includes(mutation.type)) {
          const currentRoutes = state.resources.routes.map(route => {
            return { icon: 'list', title: route.name, link: route.path }
          })
          this.menuItems[0].children = currentRoutes
        }
      })
    }
  }
}
</script>
