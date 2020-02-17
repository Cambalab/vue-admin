<template>
  <Edit title="Edit Article">
    <Input source="id" placeHolder="Id" />
    <Input source="title" placeHolder="Title" />
    <Input source="content" placeHolder="Content" />
  </Edit>
</template>

<script>
import Edit from '@components/Actions/Edit'

export default {
  name: 'EditArticles',
  components: {
    Edit,
  },
}
</script>
