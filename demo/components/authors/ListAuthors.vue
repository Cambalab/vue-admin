<template>
  <List>
    <SimpleText source="id" :sortable="true" headerText="ID" />
    <SimpleText source="name" :sortable="true" headerText="Name" />
    <SimpleText source="lastname" :sortable="true" headerText="Last name" />
    <SimpleText
      source="birthdate"
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
    },
  },
}
</script>
