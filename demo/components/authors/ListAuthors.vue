<template>
  <List>
    <p source="id"
      :sortable="true"
      headerText="ID"
    />
    <p source="name"
      :sortable="true"
      headerText="Name"
    />
    <p source="lastname"
      :sortable="true"
      headerText="Last name"
    />
    <a source="birthdate"
      :sortable="true"
      headerText="Birthdate"
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
