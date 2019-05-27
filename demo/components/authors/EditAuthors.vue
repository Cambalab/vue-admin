<template>
  <Edit>
    <input source="id" placeHolder="Id" />
    <input source="name" placeHolder="Name" />
    <input source="lastname" placeHolder="LastName" />
    <input source="birthdate" placeHolder="Birthdate" />
  </Edit>
</template>

<script>
import Edit from '@components/Actions/Edit'

export default {
  name: 'EditAuthors',
  components: {
    Edit
  }
}
</script>
