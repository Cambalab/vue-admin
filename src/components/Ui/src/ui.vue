<template>
  <v-app>
    <v-navigation-drawer app clipped v-model="drawer" fixed>
      <component :is="sidebar" :va="va">
      </component>
    </v-navigation-drawer>
    <v-toolbar class="success" dark app fixed clipped-left dense>
      <v-toolbar-title :name="UI_NAMES.MAIN_TOOLBAR_TITLE">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        {{title}}
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
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
import UI_CONTENT from '../../../constants/ui.content.default'
import UI_NAMES from '../../../constants/ui.element.names'
import { DefaultSidebar } from '@components/UiComponents';

export default {
  name: "Ui",
  props: {
    title: String,
    sidebar: {
      type: Object,
      default: () => DefaultSidebar
    },
    va: Object
  },
  data() {
    return {
      selectedLocale: "EN",
      locales: ["EN", "ID"],
      drawer: false,
      UI_CONTENT,
      UI_NAMES
    };
  },
};
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
