<template>
  <Create>
    <input source="title" placeHolder="Title" />
    <input source="content" placeHolder="Content" />
  </Create>
</template>

<script>
import Create from '@components/Actions/Create'

export default {
  name: 'CreateArticles',
  components: {
    Create
  }
}
</script>
