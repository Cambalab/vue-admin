<template>
  <Admin>
    <Resource name="articles" :resourceIdName="resourceIdName" :apiUrl="articlesApiUrl" :redirect="articlesRedirect">
      <View slot="list"   :component="ListArticles" :whitelist="['admin', 'developer']"/>
      <View slot="show"   :component="ShowArticles" />
      <View slot="create" :component="CreateArticles" />
      <View slot="edit"   :component="EditArticles" />
    </Resource>
    <Resource
      name="magazines"
      :list="ListMagazines"
      :show="ShowMagazines"
      :create="CreateMagazines"
      :edit="EditMagazines"
      :resourceIdName="resourceIdName"
      :apiUrl="magazinesApiUrl"
      :redirect="magazinesRedirect"
    />
  </Admin>
</template>

<script>

import Resource from '@components/Resource'
import Admin from '@components/Admin'

import ListArticles from './components/articles/ListArticles'
import ShowArticles from './components/articles/ShowArticles'
import CreateArticles from './components/articles/CreateArticles'
import EditArticles from './components/articles/EditArticles'

import ListMagazines from './components/magazines/ListMagazines'
import ShowMagazines from './components/magazines/ShowMagazines'
import CreateMagazines from './components/magazines/CreateMagazines'
import EditMagazines from './components/magazines/EditMagazines'

// Articles Views as Array

const articlesList = [
  {
    'label': 'id',
    'type': 'TextField',
    'tag': 'h2'
  },
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

const articlesRedirect = {
  views: {
    create: 'list',
    edit: 'show'
  }
}

const magazinesRedirect = articlesRedirect

// The name of the id attribute
const resourceIdName = 'id'

// Use case of a parsed response using feathers
// This has to be done because every server client returns different responses. - sgobotta
//
// const parseFeathersResponses = {
//   parseList: (response) => {
//     const { data } = response
//     return Object.assign({}, response, {
//       data: data.data // Vue Admin expects a 'data' object with an array of objects
//     })
//   },
//   parseSingle: (response) => {
//     const { data } = response
//     return Object.assign({}, response, {
//       data // Vue Admin expects a 'data' object as response
//     })
//   }
// }

const articlesApiUrl = 'http://localhost:8888/api/'
const magazinesApiUrl = 'http://localhost:8888/api/'

export default {
  name: 'App',
  components: {
    Admin: Admin,
    Resource: Resource
  },
  data() {
    return {
      articlesApiUrl,
      magazinesApiUrl,
      resourceIdName,
      articlesList,
      articlesShow,
      fieldsArticleCreate,
      fieldsArticleEdit,
      articlesRedirect,
      // Articles Views as Components
      ListArticles,
      ShowArticles,
      CreateArticles,
      EditArticles,
      // Magazines Views as Custom Components
      ListMagazines,
      ShowMagazines,
      CreateMagazines,
      EditMagazines,
      magazinesRedirect

      // #23 - To use a feathers server just add the parseResponses attribute
      // below, pass ':parseResponses='parseResponses' to Resource in the
      // template and update the resourceIdName to '_id'. - sgobotta
      // parseResponses: parseFeathersResponses
    }
  }
}
</script>
