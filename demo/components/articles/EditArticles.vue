<template>
  <Edit title="Edit Article">
    <TextInput source="id" placeHolder="Id" />
    <TextInput source="title" placeHolder="Title" />
    <TextInput source="content" placeHolder="Content" />
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
