<template>
  <!-- If you want to use your own custom unauthorized page you just have to provide it like:  -->
  <!-- <Admin :authProvider="authProvider" :unauthorized="UnauthorizedCustomView">             -->
  <Admin
    :authLayout="AuthCustomView"
    :authProvider="authProvider"
    :homeLayout="HomeLayout"
    :sidebar="CustomSidebar"
    :unauthorized="UnauthorizedCustomView"
  >
    <!-- Articles Resource -->
    <Resource
      name="articles"
      :resourceIdName="resourceIdName"
      :userPermissionsField="userPermissionsField"
      :apiUrl="articlesApiUrl"
      :redirect="articlesRedirect"
    >
      <View slot="list" :component="ListArticles" :permissions="['admin']" />
      <View slot="show" :component="ShowArticles" :permissions="['admin']" />
      <View
        slot="create"
        :component="CreateArticles"
        :permissions="['admin']"
      />
      <View slot="edit" :component="EditArticles" :isPublic="true" />
    </Resource>
    <!-- Magazines Resource -->
    <Resource
      name="magazines"
      :resourceIdName="resourceIdName"
      :apiUrl="magazinesApiUrl"
      :redirect="magazinesRedirect"
    >
      <View slot="list" :component="ListMagazines" :isPublic="true" />
      <View slot="show" :component="ShowMagazines" :isPublic="true" />
      <View slot="create" :component="CreateMagazines" :isPublic="true" />
      <View slot="edit" :component="EditMagazines" :isPublic="true" />
    </Resource>
    <!-- Authors Resource -->
    <Resource
      name="authors"
      :resourceIdName="resourceIdName"
      :apiUrl="authorsApiUrl"
      :redirect="authorsRedirect"
    >
      <View slot="list" :component="ListAuthors" :isPublic="true" />
      <View slot="show" :component="ShowAuthors" :isPublic="true" />
      <View slot="create" :component="CreateAuthors" :isPublic="true" />
      <View slot="edit" :component="EditAuthors" :isPublic="true" />
    </Resource>
  </Admin>
</template>

<script>
import Admin from '@components/Admin'
import Resource from '@components/Resource'

import UnauthorizedView from './components/UnauthorizedView'
import UnauthorizedCustomView from './components/UnauthorizedCustomView'
import CustomSidebar from './components/CustomSidebar'
import HomeLayout from './components/HomeLayout'

import ListArticles from './components/crud/articles/ListArticles'
import ShowArticles from './components/crud/articles/ShowArticles'
import CreateArticles from './components/crud/articles/CreateArticles'
import EditArticles from './components/crud/articles/EditArticles'

import ListMagazines from './components/crud/magazines/ListMagazines'
import ShowMagazines from './components/crud/magazines/ShowMagazines'
import CreateMagazines from './components/crud/magazines/CreateMagazines'
import EditMagazines from './components/crud/magazines/EditMagazines'

import CreateAuthors from './components/crud/authors/CreateAuthors'
import EditAuthors from './components/crud/authors/EditAuthors'
import ListAuthors from './components/crud/authors/ListAuthors'
import ShowAuthors from './components/crud/authors/ShowAuthors'

import AuthCustomView from './components/AuthCustomView'

import createAxiosAdapter from './va-auth-adapter/axios.adapter'
import axios from 'axios'

const authFields = { username: 'username', password: 'password' }
const authUrl = 'http://localhost:8888/api/auth'
const client = axios
const storageKey = 'token'
const userField = 'user'

const authProvider = createAxiosAdapter(client, {
  authFields,
  authUrl,
  storageKey,
  userField,
})

/**
 * Redirect objects
 */
const articlesRedirect = {
  views: {
    create: 'list',
    edit: 'show',
  },
}
const magazinesRedirect = articlesRedirect
const authorsRedirect = articlesRedirect

// The name of the id attribute
const resourceIdName = 'id'

// The name of the permissions field
const userPermissionsField = 'permissions'

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
const authorsApiUrl = 'http://localhost:8888/api/'

export default {
  name: 'App',
  components: {
    Admin,
    Resource,
  },
  data() {
    return {
      // Admin props
      authProvider,
      AuthCustomView,
      UnauthorizedView,
      UnauthorizedCustomView,
      CustomSidebar,
      HomeLayout,

      // Common Resource props
      resourceIdName,
      userPermissionsField,

      // Server Urls
      articlesApiUrl,
      magazinesApiUrl,
      authorsApiUrl,

      // Articles Views as Components
      ListArticles,
      ShowArticles,
      CreateArticles,
      EditArticles,
      articlesRedirect,
      // Magazines Views as Custom Components
      ListMagazines,
      ShowMagazines,
      CreateMagazines,
      EditMagazines,
      magazinesRedirect,
      // Authors Views as Components
      ListAuthors,
      ShowAuthors,
      CreateAuthors,
      EditAuthors,
      authorsRedirect,

      // #23 - To use a feathers server just add the parseResponses attribute
      // below, pass ':parseResponses='parseResponses' to Resource in the
      // template and update the resourceIdName to '_id'. - sgobotta
      // parseResponses: parseFeathersResponses
    }
  },
}
</script>
