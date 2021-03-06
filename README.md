<p align="center">
  <a target="_blank" rel="noopener noreferrer">
    <img width="140" src="public/logo.png" alt="Vue-Admin logo" />
  </a>
</p>

<h4 align="center">Vue-Admin is designed to let developers build frontend administration applications that run in the browser in a very easy way using Vue, Javascript and REST services.</h4>

<p align="center">
  <a href="https://travis-ci.com/Cambalab/vue-admin"><img src="https://travis-ci.com/Cambalab/vue-admin.svg?branch=develop" alt="Build Status"></a>
  <a href="https://codecov.io/gh/Cambalab/vue-admin"><img src="https://codecov.io/gh/Cambalab/vue-admin/branch/develop/graph/badge.svg" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/vue-admin-js"><img src="https://img.shields.io/npm/v/vue-admin-js.svg" alt="Version"></a>
  <a href="https://github.com/Cambalab/vue-admin/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/vue-admin-js.svg" alt="License"></a>
  <a href="https://github.com/Cambalab/vue-admin/blob/master/.github/CODE_OF_CONDUCT.md"><img src="https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg" alt="License"></a>
</p>

## Introduction

*We've been working a lot with other libraries that generate administration dashboards, routes, resources in other javascript frameworks, but did not find any Vue library capable of performing this kind of solution, except of many really impressive Vue libraries that provide UI components for admin dashboards. We are pretty convinced Vue's learning curve is gentle, so we thought we could try and build our own tool.*

<p align="center">
<img src="public/demo.gif" alt="demo of the app running" />
</p>

## About the library

Given a simple configuration to Vue-Admin components, this library connects your backend and interprets your services as frontend resources from which **CRUD** views are automatically created and associated with a route.  
Vue-Admin also lets you create custom views to provide other kind of information to the site (measures, landings, etc).

**Vue-Admin provides:**
+   **create**, **read**, **update** and **delete** views for each declared resource.
+   customizable **homepage**.
+   **navigation** between views.
+   an **authentication** view
+   [**vuetify2**](https://github.com/vuetifyjs/vuetify) support

## Dependencies and third party libraries

**We assume your project ships the following dependencies:**

+   [**vue-router:**](https://github.com/vuejs/vue-router) used to dynamically create routes and bind components to them. We also take advantage of some of the route hooks.
+   [**vuex:**](https://github.com/vuejs/vuex) lets us globally share information between the core application and component customizations of a library user.
+   [**vuetify:**](https://github.com/vuetifyjs/vuetify) we basically don't want to implement UI components from scratch, plus their widgets are awesome. The drawer, buttons, cards and CRUD views are implemented with Vuetify, but you could use any other UI framework if you want to build your own CRUD views. Take the [magazines](/demo/components/magazines) view as example.

**Core Libaries vue-admin-js depends on:**

+   [**vuex-crud:**](https://github.com/JiriChara/vuex-crud) this lightweight tool creates the resources crud store state, mutations and getters for us.

## Installation

```bash
# using npm
npm i --save vue-admin-js
```

## Configuration

### Auth Provider
You will have to configure an adapter to communicate with your REST api.

We currently provide a simple example using an axios client in the demo app. Though we intend to keep developing other kind of adapters for different node backend frameworks, they will live in separate packages.

Anyways, we hope the axios example encourages you to write your own adapter until we release the adapters guide. The `@va-auth` module uses the vuex store and expects a user to make use of the action types it provides.

## Usage

***App.vue***
```vue
<template>
  <Admin :authProvider="authProvider">
    <Resource
      name="articles"
      resourceIdName="id"
      userPermissionsField="permissions"
      apiUrl="http://localhost:8888/api/"
    >
      <View slot="list"   :component="ListArticles"   :permissions="['admin']" />
      <View slot="show"   :component="ShowArticles"   :permissions="['admin']" />
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
  import createAxiosAdapter from './va-auth-adapter/axios.adapter'
  import axios from 'axios'

  const authUrl = 'http://localhost:8888/api/auth'
  const client = axios

  const authProvider = createAxiosAdapter(client, { authUrl })

  export default {
    name: 'App',
    components: {
      Admin,
      Resource
    },
    data() {
      return {
        authProvider,
        // Your Components
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

## Using your own custom authentication component

By default Vue-Admin provides a default authentication view, but you may desire to use your own custom view to authenticate. In that case, you just need to pass it as a property in the *Admin* component like the following.

*Example of custom authentication component usage*
```vue
  ...
  <Admin :authProvider="authProvider" :authLayout="AuthCustomView">
  ...
```

In order to use the available authentication mechanism you have to declare a *prop* with a *va* object field which will contain the bounded `login` function.

*Example of provided login mechanism usage in custom auth component*
```vue
  ...
  props: {
    va: {
      type: Object,
      required: true
    }
  },
  ...
  methods: {
    login() {
      this.va.login(this.username, this.password)
    }
  }
  ...
```

### Examples

For a complete example take a look at the [**demo files**](/demo)

Some of the custom components examples can be found in the [**magazines views**](/demo/components/magazines)

## Starting a new project

*Using the official Vue cli*
```bash
# install the official vue cli
npm install -g @vue/cli-init
# initialise the project
vue init webpack my-project
cd my-project
# install required dependencies
npm install --save vue-admin-js vue-router vuex vuex-crud vuetify
# run the project
npm run dev
```

*...and start customizing your [App.vue](https://github.com/Cambalab/vue-admin/blob/master/demo/App.vue)*

## Getting it running

To get vue-admin-js up and running we'll need two terminals: one for the frontend and another one simulating a backend.

Clone a `vue-admin-js` repository and open two terminals in the repository root.
```bash
git clone https://github.com/Cambalab/vue-admin.git
cd vue-admin
```

In the first terminal get the node development server running
```bash
# install the test server dependencies
cd utils/server-test && npm install
# run the server (we prefer to use the same port as Cypress server)
PORT=8888 node server
```

In the second terminal get the frontend application running
```bash
# make sure you're in the root of the project
npm install
npm run serve
```

### Demo app credentials

User with **admin** permissions
> **username:** dev@camba.coop  
> **password:** 123456

User with **guest** permissions

> **username:** user@camba.coop  
> **password:** 123456

## Scripts: tests, lint, build

**We use the `vue-cli-service` to run tests, lint checking and the library build.**

> All of the above are used by the travis continuous integration.

***unit tests***
```bash
# in the root of the project run the unit tests script
npm run test:unit
```

***end to end tests***
```bash
# go to the root of the project to run the e2e tests script
# there's no need to run the test server, we use the Cypress server
npm run test:e2e
```

***lint service***
```bash
# zero tolerance for errors and warnings
npm run lint
```

***build service***
```bash
# the build is targeted as a library
npm run build
```

## Contribution

Please make sure to read the [**Contributing Guide**](https://github.com/Cambalab/vue-admin/blob/master/.github/CONTRIBUTING.md) before making a pull request.

## License

[**GNU General Public License version 3**](https://opensource.org/licenses/GPL-3.0)

# <Divider>

<p align="center">
  <strong>👩‍💻 with :green_heart: :purple_heart: :heart: by <a href="https://camba.coop" target="_blank" rel="noopener noreferrer"><img width="20" src="http://camba.coop/assets/signature/no_text_logo.png" /> cambá.coop</a> :earth_americas: Buenos Aires, Argentina
  </strong>
</p>