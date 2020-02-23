<template>
  <List title="Articles">
    <SimpleText
      source="id"
      :sortable="true"
      headerText="Id"
      alignHeader="left"
      alignContent="left"
    />
    <SimpleText
      source="title"
      :sortable="true"
      headerText="Title"
      alignHeader="center"
      alignContent="left"
      width="400px"
    />
    <SimpleText
      source="content"
      :sortable="true"
      headerText="Content"
      alignHeader="center"
      alignContent="right"
    />
  </List>
</template>

<script>
import List from '@components/Actions/List'

export default {
  name: 'ListArticles',
  components: {
    List,
  },
}
</script>
