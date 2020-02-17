<template>
  <List>
    <TextField source="id"
      :sortable="true"
      headerText="ID"
    />
    <TextField source="name"
      :sortable="true"
      headerText="Name"
    />
    <TextField source="lastname"
      :sortable="true"
      headerText="Last name"
    />
    <TextField source="birthdate"
      :sortable="true"
      headerText="Birthdate"
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
    List,
  },
  methods: {
    parse(date) {
      return formatDate(parseDate(date))
    }
  }
}
</script>
