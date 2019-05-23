<template>
  <Show>
    <h3 source="id" />
    <span><h2 source="name" /><h2 source="lastname" /></span>
    <p source="birthdate" />
  </Show>
</template>

<script>
import Show from '@components/Actions/Show'

export default {
  name: 'ShowAuthors',
  components: {
    Show
  }
}
</script>
