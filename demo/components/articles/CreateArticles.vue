<template>
  <Create title="Create Article">
    <Input source="title" placeHolder="Title" />
    <Input source="content" placeHolder="Content" />
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
