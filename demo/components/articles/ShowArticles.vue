<template>
  <Show>
    <h3 source="id" />
    <h2 source="title" />
    <p source="content" />
  </Show>
</template>

<script>
import Show from '@components/Actions/Show'

export default {
  name: 'ShowArticles',
  components: {
    Show
  }
}
</script>
