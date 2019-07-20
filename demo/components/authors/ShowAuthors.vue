<template>
  <Show>
    <h3 source="id" />
    <h2 source="name" />
    <h2 source="lastname" />
    <p source="birthdate" type="TextField" :parse="parse" />
  </Show>
</template>

<script>
import Show from '@components/Actions/Show'
import dateInputMethods from './authors-date-input-methods'

const { formatDate, parseDate } = dateInputMethods

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
