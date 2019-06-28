<template>
  <Sidebar>
    <template v-for="(item, i) in menuItems">
      <Node v-if="item.children" :key="i"
        :title="item.title" icon="keyboard_arrow_up" icon-alt="keyboard_arrow_down">
        <Link v-for="(child, i) in item.children" :key="i"
          :title="child.title" :path="child.link" :icon="child.icon"
        />
      </Node>

      <Link v-else-if="item.link" :key="item.title"
        :title="item.title" :path="item.link" :icon="item.icon"
      />

      <Action v-else-if="item.click" :key="item.title"
        :title="item.title" :action="item.click" :icon="item.icon"
      />
    </template>
  </Sidebar>
</template>
<script>
import UI_CONTENT from '../../../constants/ui.content.default'
import UI_NAMES from '../../../constants/ui.element.names'
import { Sidebar, Node, Link, Action } from '@components/UiComponents'

export default {
  name: "DefaultSidebar",
  components: {
    Sidebar,
    Node,
    Link,
    Action
  },
  props: {
    va: Object
  },
  data() {
    return {
      selectedLocale: "EN",
      locales: ["EN", "ID"],
      menuItems: [
        {
          click: () => {},
          icon: "keyboard_arrow_up",
          "icon-alt": "keyboard_arrow_down",
          title: "Crud",
          children: [],
          model: {},
          value: true,
        },
        {
          click: () => this.va.logout(),
          icon: "power_settings_new",
          title: "Sign Out",
        }
      ],
      UI_CONTENT,
      UI_NAMES
    }
  },
  mounted() {
    this.mapCurrentRegisteredRoutes()
  },
  methods: {
    // Listen to addRoutes mutations
    mapCurrentRegisteredRoutes() {
      let whitelist = ["resources/addRoute"];
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
