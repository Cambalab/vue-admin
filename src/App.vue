<template>
    <Admin>
      <Resource name='articles'></Resource>
      <router-link to="/articles/list"><button>Testing resource</button></router-link>
      <router-view></router-view>     
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
