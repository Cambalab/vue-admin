<template>
  <v-card>
    <v-card-title>
      <h2>You do not have permissions for accessing this view</h2>
    </v-card-title>
    <v-card-text>
      <p>If you think you should, please contact an administrator.</p>
      <v-btn class="m-0" color="success" v-on:click="goBack">
          BACK
      </v-btn>
    </v-card-text>
  </v-card>
</template>
<script>
import Unauthorized from '@components/Unauthorized'
export default {
  name: 'UnauthorizedCustomView',
  components: {
    Unauthorized
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
