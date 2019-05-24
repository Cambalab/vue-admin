<template>
  <Show>
    <h3 source="id" />
    <h2 source="name" />
    <h2 source="lastname" />
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
