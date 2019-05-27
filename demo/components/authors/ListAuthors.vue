<template>
  <List>
    <p source="id"
      :sortable="true"
      headerText="ID"
      alignHeader="left"
      alignContent="left"
    />
    <h3 source="name"
      :sortable="true"
      headerText="Name"
      alignHeader="center"
      alignContent="left"
    />
    <p source="lastname"
      :sortable="true"
      headerText="LastName"
      alignHeader="center"
      alignContent="right"
    />
    <p source="birthdate"
      :sortable="true"
      headerText="Birthdate"
      alignHeader="center"
      alignContent="right"
    />
  </List>
</template>

<script>
import List from '@components/Actions/List'

export default {
  name: 'ListAuthors',
  components: {
    List
  }
}
</script>
