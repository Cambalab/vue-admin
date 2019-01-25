<template>
  <ListWrapper>
    <p source="id" />
    <h1 source="title" />
    <p source="content" />
  </ListWrapper>
</template>

<script>
import ListWrapper from '@components/Actions/List'

export default {
  name: 'ListArticles',
  components: {
    ListWrapper
  },
  props: {
    resourceId: String,
    hasShow: Boolean,
    hasCreate: Boolean,
    va: Object
  }
}
</script>
