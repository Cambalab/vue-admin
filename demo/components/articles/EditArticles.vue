<template>
  <Edit>
    <input source="title" placeHolder="Title" />
    <input source="content" placeHolder="Content" />
  </Edit>
</template>

<script>
import Edit from '@components/Actions/Edit'

export default {
  name: 'EditArticles',
  components: {
    Edit
  }
}
</script>
