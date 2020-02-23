<template>
  <Create title="Create Article">
    <TextInput source="title" placeHolder="Title" />
    <TextInput source="content" placeHolder="Content" />
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
