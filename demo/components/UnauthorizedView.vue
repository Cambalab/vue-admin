<template>
  <UnauthorizedLayout>
    <SimpleText
      slot="title"
      type="h5"
      value="You do not have permissions for accessing this view"
    />
    <SimpleText
      slot="text"
      value="If you think you should be allowed to see this content, please contact the page administrator"
    />
  </UnauthorizedLayout>
</template>
<script>
import { UnauthorizedLayout } from '@components/Layouts'
import { SimpleText } from '@components/UiComponents'

export default {
  name: 'UnauthorizedView',
  components: {
    UnauthorizedLayout,
    SimpleText,
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
  },
}
</script>
<style scoped>
.m-0 {
  margin: 0;
}
</style>
