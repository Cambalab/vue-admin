<template>
  <Edit title="Edit Article">
    <TextField source="id" placeHolder="Id" />
    <TextField source="title" placeHolder="Title" />
    <TextField source="content" placeHolder="Content" />
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
