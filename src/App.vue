<template>
    <Admin>
      <Resource
        name='articles'
        :list='articlesList'
        :show='articlesShow'
        :create='fieldsArticleCreate'
        :edit='fieldsArticleEdit'
        :resourceId='resourceId'
        apiUrl='http://localhost:8080/api/'
        >
      </Resource>
    </Admin>
</template>

<script>
import Admin from "./components/Admin";
import Resource from "./components/Resource";

const articlesList = [
  {
    'label':'title',
    'type':'TextField',
    'tag':'h2'
  },
  'content'
]

const articlesShow = [
  'id',
  {
    'label':'title',
    'type': 'TextField',
    'tag': 'h1'
  },
  'content'
]

const fieldsArticleCreate =[
  {
    'label':'title',
    'type':'Input',
    'placeHolder': 'title'
  },
  'content'
]

const fieldsArticleEdit = fieldsArticleCreate

const resourceId = "id"

// Use case of a parsed response using feathers
// This has to be done because every server client returns different responses. - sgobotta
//
// const parseFeathersResponses = {
//   parseList: (response) => {
//     const { data } = response;
//     return Object.assign({}, response, {
//       data: data.data // expecting array of objects with IDs
//     });
//   },
//   parseSingle: (response) => {
//     const { data } = response;
//     return Object.assign({}, response, {
//       data // expecting object with ID
//     });
//   }
// }

export default {
  name: "App",
  components: {
    Admin: Admin,
    Resource: Resource
  },
  data() {
    return {
      articlesList,
      articlesShow,
      fieldsArticleCreate,
      fieldsArticleEdit,
      resourceId,
      // #23 - To use the feathers server just add the parseResponses attribute
      // below, pass ':parseResponses='parseResponses' to Resource in the
      // template and update the resourceId to '_id'. - sgobotta
      // parseResponses: parseFeathersResponses
    };
  }
};
</script>
