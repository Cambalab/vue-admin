
<div style="text-align: center">
  <img style="text-align: center" src="public/logo.png" width="200">
</div>

## Vue-admin

A frontend Framework for building `admin applications` running in the browser
on top of `REST services`, using `ES6`, `VuEx` and `Vuetify`.

For routing Vue-Admin uses `vue-router`.

Vue-Admin-Js uses VueJs and VuEx, and its based on `Vuex-Crud` library to create the resources.

## Setting Up

```bash

# clone the repository
git clone https://github.com/Cambalab/vue-admin.git

# go to the source folder
cd vue-admin

# install dependecies
npm install

# install dependencies for the default fake backend designed for you to testing the framework. It will running on localhost:8080
cd utils/server-test

# install dependecies
npm install

```

## Compiles and hot-reloads for development

```bash

# go to the source folder
cd vue-admin

# run with npm
npm run serve

```

## Running testing server

```bash

# If you want to try Vue-Admin with the testing REST api that we provide
cd utils/server-test

# run with node
node server.js

```

## Compiles and minifies for production

```
npm run build
```

## Lints and fixes files

```
npm run lint
```

## E2e Tests

```
npm run test:e2e
```
