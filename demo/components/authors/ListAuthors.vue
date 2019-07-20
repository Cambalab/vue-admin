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
      type="TextField"
      :parse="parse"
    />
  </List>
</template>

<script>
import List from '@components/Actions/List'
import dateInputMethods from './authors-date-input-methods'

const { formatDate, parseDate } = dateInputMethods

export default {
  name: 'ListAuthors',
  components: {
    List
  },
  methods: {
    parse(date) {
      return formatDate(parseDate(date))
    }
  }
}
</script>
