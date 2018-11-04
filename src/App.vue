<template>
    <Admin>
      <Resource
        name='articles'
        v-bind:views="['list', 'show']">
      </Resource>
    </Admin>
</template>

<script>
import Admin from "./components/Admin";
import Resource from "./components/Resource";

export default {
  name: "App",
  components: {
    Admin: Admin,
    Resource: Resource
  },
  data() {
    return {};
  }
};
</script>
