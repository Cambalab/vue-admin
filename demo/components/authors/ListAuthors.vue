<template>
  <List>
    <p source="id"
      :sortable="true"
      headerText="ID"
      alignHeader="left"
      alignContent="left"
    />
    <p source="name"
      :sortable="true"
      headerText="Name"
      alignHeader="center"
      alignContent="left"
    />
    <p source="lastname"
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
import dateUtils from '@demo/utils/dates'

const { formatDate, parseDate } = dateUtils

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
