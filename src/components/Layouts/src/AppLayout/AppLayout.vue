<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <component :is="sidebar" :va="va" />
    </v-navigation-drawer>

    <v-app-bar app color="teal" dark>
      <v-app-bar-nav-icon
        :name="names.drawerButton"
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title :name="names.toolbarTitle">
        {{ title }}
      </v-toolbar-title>
    </v-app-bar>

    <main>
      <v-content>
        <v-container class="no-padding">
          <slot></slot>
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<script>
import UI_NAMES from '@constants/ui.element.names'

export default {
  name: 'AppLayout',
  props: {
    sidebar: {
      type: Object,
      required: true,
    },
    title: String,
    va: Object,
  },
  data() {
    const names = {
      drawerButton: UI_NAMES.DRAWER_BUTTON,
      toolbarTitle: UI_NAMES.MAIN_TOOLBAR_TITLE,
    }
    return {
      selectedLocale: 'EN',
      locales: ['EN', 'ID'],
      drawer: false,
      names,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.no-padding {
  padding: 0;
}
</style>
