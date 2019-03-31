<p align="center">
  <a target="_blank" rel="noopener noreferrer">
    <img width="140" src="public/logo.png" alt="Vue Admin logo" />
  </a>
</p>

<h1 align="center">Vue Admin</h1>

<h4 align="center">A frontend Framework for building admin applications running in the browser on top of REST services, using ES6, vue-router, vuex, vuex-crud and vuetify.</h4>

## Introduction

***We've been working a lot with other libraries that generate administration dashboards, routes, resources in other javascript frameworks, but did not find any Vue library capable of performing this kind of solution, except of many really impressive Vue libraries that provide UI components for admin dashboards. We are pretty convinced Vue's learning curve is gentle, so we thought we could try and build our own tool to help building administration applications.***

## Dependencies and third party libraries

***We assume your project is currently shipped with the following dependencies:***

+   [**vue-router:**](https://github.com/vuejs/vue-router) ***used to dynamically create routes and bind components to them. We also take advantage of some of the route hooks.***
+   [**vuex:**](https://github.com/vuejs/vuex) ***lets us globally share information between the core application and component customizations of a library user.***

***Core Libaries vue-admin-js depends on***

+   [**vuex-crud:**](https://github.com/JiriChara/vuex-crud) ***this lightweight tool creates the resources crud store state, mutations and getters for us.***
+   [**vuetify:**](https://github.com/vuetifyjs/vuetify) **we basically don't want to implement UI components from scratch, plus their widgets are awesome. The drawer, buttons, cards and CRUD views are implemented with Vuetify, but you could use any other UI framework if you want to build your own CRUD views. Take a look at the [magazines example](/demo/components/magazines)**.

## Installation

```bash
# using npm
npm i --save vue-admin-js
```

## Usage

***App.vue***
```vue
<template>
  <Admin>
    <Resource
      name="articles"
      resourceIdName="id"
      userPermissionsField="permissions"
      apiUrl="http://localhost:8888/api/"
    >
      <View slot="list"   :component="ListArticles" :permissions="['admin']" />
      <View slot="show"   :component="ShowArticles" :permissions="['admin']" />
      <View slot="create" :component="CreateArticles" :permissions="['admin']" />
      <View slot="edit"   :component="EditArticles" :isPublic="true" />
    </Resource>
  </Admin>
</template>

<script>
  import { Admin, Resource } from 'vue-admin-js'
  // Your components
  import ListArticles from './components/articles/ListArticles'
  import ShowArticles from './components/articles/ShowArticles'
  import CreateArticles from './components/articles/CreateArticles'
  import EditArticles from './components/articles/EditArticles'

  export default {
    name: 'App',
    components: {
      Admin,
      Resource
    },
    data() {
      return {
        ListArticles,
        ShowArticles,
        CreateArticles,
        EditArticles,
      }
    }
  }
</script>
```

***ListArticles.vue***
```vue
<template>
  <List>
    <p source="id" :sortable="true" headerText="ID" alignHeader="left" alignContent="left" />
    <h3 source="title" :sortable="true" headerText="Title" alignHeader="center" alignContent="left" />
    <p source="content" :sortable="true" headerText="Content" alignHeader="center" alignContent="right" />
  </List>
</template>

<script>
import { List } from 'vue-admin-js'

export default {
  name: 'ListArticles',
  components: {
    List
  }
}
</script>
```

##### For a complete example take a look at the [demo files](/demo)

##### User custom components examples can be found in the [magazines example](/demo/components/magazines)

## Try it out (forks are more than welcomed :D)

```bash
# clone the repository
git clone https://github.com/yourgithubuser/vue-admin.git

# navigate to the repository and install npm dependencies
cd vue-admin && npm install

# install the test server dependencies
cd ../utils/server-test && npm install

# run the server (we prefer to use the same port as Cypress server)
PORT=8888 node server

# in another terminal go to the repo directory and run the Vue application
npm run serve
```

## Running the tests

**We use the vue-cli-service to run the tests**

***end to end tests***
```bash
# go to the root of the project to run the e2e tests script
# there's no need to run the test server, we use the Cypress server
npm run test:e2e
```

***unit tests***
```bash
# in the root of the project run the unit tests script
npm run test:unit
```

## Contributing and Future features

**We are currently working on this project while learning new stuff day after day. We also receive ideas and improvements from Vue meetings and people we work with everyday.**

**Nothing could make us happier than the community involvement into this framework, so**
***if you feel like contributing or just sharing an idea for us to improve the library, please do not hesitate to comment our issues or open an issue with the available labels.***

---
<p align="center">
  <a href="https://camba.coop" target="_blank" rel="noopener noreferrer">
    <img class="margin" width="20" src="public/camba_icon.png" />
  </a>
  <strong>With :green_heart::purple_heart::heart: from <a href="https://camba.coop" target="_blank" rel="noopener noreferrer">Cambá Coop</a>, Buenos Aires, Argentina</strong>
  <a href="https://camba.coop" target="_blank" rel="noopener noreferrer">
    <img class="margin" width="20" src="public/camba_icon.png" />
  </a>
</p>
