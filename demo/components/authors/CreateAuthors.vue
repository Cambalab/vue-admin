<template>
  <Create>
    <input source="name" placeHolder="Name" />
    <input source="lastname" placeHolder="LastName" />
    <input source="birthdate" placeHolder="Birthdate" />
  </Create>
</template>

<script>
import Create from '@components/Actions/Create'

export default {
  name: 'CreateAuthors',
  components: {
    Create
  }
}
</script>
