<template>
  <div>
    <h1> {{name}} resource: create operation </h1>
    <div>
      <input v-model="article.title" placeholder="edit title" />
      <input v-model="article.content" placeholder="edit content" />
      <button v-on:click="submit">Save</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Create",

  props: {
    name: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      article: {
        title: '',
        content: ''
      }
    }
  },
  computed: {
    ...mapState([
      "route" // vuex-router-sync
    ])
  },

  methods: {
    submit() {
      const resourceName = this.name + "/create";
      const article = {
        title: this.article.title,
        content: this.article.content
      }
      return this.$store.dispatch(resourceName, { data: article });
    }
  },

  created() {

  }
};
</script>
