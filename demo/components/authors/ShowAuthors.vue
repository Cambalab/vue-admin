<template>
  <Show>
    <TextField type="h3" source="id" />
    <TextField type="h2" source="name" />
    <TextField type="h2" source="lastname" />
    <TextField source="birthdate" :parse="parse" />
  </Show>
</template>

<script>
import Show from '@components/Actions/Show'
import dateUtils from '@demo/utils/dates'

const { formatDate, parseDate } = dateUtils

export default {
  name: 'ShowAuthors',
  components: {
    Show
  },
  methods: {
    parse(date) {
      return formatDate(parseDate(date))
    }
  }
}
</script>
