<template>
    <Admin>
      <Resource
        name='articles'
        :list='articlesList'
        :show='articlesShow'
        :create='fieldsArticleCreate'
        :edit='fieldsArticleEdit'
        :resourceIdName='resourceIdName'
        :apiUrl='apiUrl'
        >
      </Resource>
      <Resource
        name='magazines'
        :list='magazinesList'
        :show='ShowMagazines'
        :create='CreateMagazines'
        :edit='EditMagazines'
        :resourceIdName='resourceIdName'
        :apiUrl='apiUrl'
        >
      </Resource>
    </Admin>
</template>

<script>
import Admin from "@components/Admin";
import Resource from "@components/Resource";
import ShowMagazines from './components/ShowMagazines'
import CreateMagazines from './components/CreateMagazines'
import EditMagazines from './components/EditMagazines'

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
  'content',
  'campoQueNoExiste'
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

const resourceIdName = "id"

const magazinesList = [
  {
    'label':'name',
    'type':'TextField',
    'tag':'h2'
  },
  'issue',
  'publisher'
]

const magazinesShow = [
  'id',
  {
    'label':'name',
    'type': 'TextField',
    'tag': 'h1'
  },
  'issue',
  'publisher'
]

const fieldsMagazineCreate =[
  {
    'label':'name',
    'type':'Input',
    'placeHolder': 'name'
  },
  'issue',
  'publisher'
]

const fieldsMagazineEdit = fieldsMagazineCreate

// Use case of a parsed response using feathers
// This has to be done because every server client returns different responses. - sgobotta
//
// const parseFeathersResponses = {
//   parseList: (response) => {
//     const { data } = response;
//     return Object.assign({}, response, {
//       data: data.data // Vue Admin expects a 'data' object with an array of objects
//     });
//   },
//   parseSingle: (response) => {
//     const { data } = response;
//     return Object.assign({}, response, {
//       data // Vue Admin expects a 'data' object as response
//     });
//   }
// }

const apiUrl = 'http://localhost:8080/api/'

export default {
  name: "App",
  components: {
    Admin: Admin,
    Resource: Resource
  },
  data() {
    return {
      apiUrl,
      articlesList,
      articlesShow,
      fieldsArticleCreate,
      fieldsArticleEdit,
      resourceIdName,
      magazinesList,
      magazinesShow,
      fieldsMagazineCreate,
      fieldsMagazineEdit,
      ShowMagazines,
      CreateMagazines,
      EditMagazines
      // #23 - To use the feathers server just add the parseResponses attribute
      // below, pass ':parseResponses='parseResponses' to Resource in the
      // template and update the resourceIdName to '_id'. - sgobotta
      // parseResponses: parseFeathersResponses
    };
  }
};
</script>
