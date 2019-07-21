<template>
  <v-card>
    <v-card-title>
      <slot name="title">
        <h2 :name="NAME_UNAUTHORIZED_HEADER_CONTAINER">
          You do not have permission to access this page.
        </h2>
      </slot>
    </v-card-title>
    <v-card-text>
      <slot name="text">
        <p :name="NAME_UNAUTHORIZED_MESSAGE_CONTAINER">
          If you think you should be allowed to see this page, please contact the administrator.
        </p>
      </slot>
      <v-btn :name="NAME_BUTTON_GO_BACK" class="m-0" color="success" v-on:click="goBack">
        back
      </v-btn>
    </v-card-text>
  </v-card>
</template>
<script>
import UI_NAMES from '@constants/ui.element.names'
import Unauthorized from '@components/Unauthorized'
export default {
  name: 'UnauthorizedCustomView',
  components: {
    Unauthorized
  },
  data: () => {
    return {
      NAME_BUTTON_GO_BACK: UI_NAMES.BUTTON_GO_BACK,
      NAME_UNAUTHORIZED_HEADER_CONTAINER:  UI_NAMES.UNAUTHORIZED_HEADER_CONTAINER,
      NAME_UNAUTHORIZED_MESSAGE_CONTAINER: UI_NAMES.UNAUTHORIZED_MESSAGE_CONTAINER,
    }
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
