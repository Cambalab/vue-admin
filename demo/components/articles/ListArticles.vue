<template>
  <List>
    <p source="id" :sortable="true" headerText="ID" alignHeader="left" alignContent="left" />
    <h3 source="title" :sortable="true" headerText="Title" alignHeader="center" alignContent="left" />
    <p source="content" :sortable="true" headerText="Content" alignHeader="center" alignContent="right" />
  </List>
</template>

<script>
import List from '@components/Actions/List'

export default {
  name: 'ListArticles',
  components: {
    List
  }
}
</script>
