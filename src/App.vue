<template>
    <Admin>
      <Resource
        name='articles'
        v-bind:views="['list', 'show', 'create']"
        v-bind:fields="[
        {
          'id':1,
          'label':'title',
          'type':'TextField'
        },
        {
          'id':2,
          'label':'content',
          'type':'TextField'
        }]"
        >
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
