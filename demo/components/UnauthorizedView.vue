<template>
  <UnauthorizedLayout>
    <h2 slot="title">You do not have permissions for accessing this view</h2>
    <div slot="text">
      <p>If you think you should be allowed to see this view, please contact the page administrator.</p>
      <v-btn class="m-0" color="success" v-on:click="goBack">
          BACK
      </v-btn>
    </div>
  </UnauthorizedLayout>
</template>
<script>
import { UnauthorizedLayout } from '@components/Layouts'
export default {
  name: 'UnauthorizedView',
  components: {
    UnauthorizedLayout
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}
</script>
<style scoped>
  .m-0 {
    margin: 0;
  }
</style>
