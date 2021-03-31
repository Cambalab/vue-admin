<template>
  <Show title="Article">
    <SimpleText type="h2" source="id" />
    <SimpleText type="h3" source="title" />
    <SimpleText source="content" />
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
