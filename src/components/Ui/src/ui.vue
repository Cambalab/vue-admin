<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <component :is="sidebar" :va="va" />
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title :name="UI_NAMES.MAIN_TOOLBAR_TITLE">
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
