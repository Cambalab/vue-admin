<template>
  <v-container fluid>
    <v-flex xs12 class="va-img-sector">
      <div class="va-img-container">
        <img class="va-logo" :src="logo" />
        <h3 class="headline mt-3">
          Welcome to Vue-Admin
        </h3>
      </div>
    </v-flex>
  </v-container>
</template>
<script>
import logo from '@assets/logo.png'

export default {
  name: 'HomeLayout',
  data() {
    return {
      logo,
    }
  },
  props: {},
}
</script>

<style>
.va-img-sector {
  position: relative;
  text-align: center;
}

.va-img-container {
  margin-top: 20vh;
}

.va-logo {
  margin: auto;
  width: 140px;
}
</style>
