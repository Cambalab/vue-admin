<template>
  <List>
    <h3 source="id"
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
    <h3 source="lastname"
      :sortable="true"
      headerText="Last name"
      alignHeader="center"
      alignContent="left"
    />
    <a source="birthdate"
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
