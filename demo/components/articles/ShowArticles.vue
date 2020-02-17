<template>
  <Show title="Article">
    <TextField type="h2" source="id" />
    <TextField type="h3" source="title" />
    <TextField source="content" />
  </Show>
</template>

<script>
import Show from '@components/Actions/Show'

export default {
  name: 'ShowArticles',
  components: {
    Show,
  },
}
</script>
