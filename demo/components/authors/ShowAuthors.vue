<template>
  <Show>
    <SimpleText type="h3" source="id" />
    <SimpleText type="h2" source="name" />
    <SimpleText type="h2" source="lastname" />
    <SimpleText source="birthdate" :parse="parse" />
  </Show>
</template>

<script>
import Show from '@components/Actions/Show'
import dateUtils from '@demo/utils/dates'

const { formatDate, parseDate } = dateUtils

export default {
  name: 'ShowAuthors',
  components: {
    Show,
  },
  methods: {
    parse(date) {
      return formatDate(parseDate(date))
    },
  },
}
</script>
