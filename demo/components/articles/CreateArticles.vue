<template>
  <Create title="Create Article">
    <TextField source="title" placeHolder="Title" />
    <TextField source="content" placeHolder="Content" />
  </Create>
</template>

<script>
import Create from '@components/Actions/Create'

export default {
  name: 'CreateArticles',
  components: {
    Create,
  },
}
</script>
