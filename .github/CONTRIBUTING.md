# Vue-Admin Contributing Guide

Hi! We're really excited that you are interested in contributing to Vue-Admin. Before submitting your contribution, please make sure to take a moment and read through the following guidelines:

+   [Code of Conduct](https://github.com/Cambalab/vue-admin/blob/master/.github/CODE_OF_CONDUCT.md)
+   [Issue Reporting Guidelines](#issue-reporting-guidelines)
+   [Pull Request Guidelines](#pull-request-guidelines)
+   [Development Setup](#development-setup)
+   [Project Structure](#project-structure)

## Issue Reporting Guidelines

- Always use our [**bug**](https://github.com/Cambalab/vue-admin/issues/new?assignees=&labels=&template=bug_report.md&title=) or [**feature**](https://github.com/Cambalab/vue-admin/issues/new?assignees=&labels=&template=feature_request.md&title=) templates to create an issue.

## Pull Request Guidelines

+  The `master` branch is just a snapshot of the latest stable release. All development should be done in dedicated branches. **Do not submit PRs against the `master` branch.**

+  Checkout a topic branch from the relevant branch, e.g. `develop`, and merge back against that branch. Please follow this convention for the new branch: `issueNumber-githubUsernaame-commit-title`

+  Most of the contributed work should generally target the `src` folder.

+  It's OK to have multiple small commits as you work on the PR - We may squash them before merging if necessary

+   Make sure `npm run test` passes. (see [**development setup**](#development-setup))

+   If adding a new feature:
    +   Add accompanying test case (at the moment a unit test would be enough).
    +   Provide a convincing reason to add this feature. Ideally, you should open a suggestion issue first and have it approved before working on it.

+   If fixing bug:
    +   If you are resolving a special issue, please follow the branch naming convention mentioned above.
    +   Provide a detailed description of the bug in the PR. Live demo preferred.
    +   Add appropriate test coverage if applicable.

## Development Setup

You will need [**Node.js**](http://nodejs.org) **version 8+**.

After cloning the forked repository, run:

```bash
npm install
```

### Committing Changes

We don't expect any strict convention, but we'd be grateful if you summarize what your modifications content is about when writing a commit.

### Commonly used NPM scripts

``` bash
# watch and auto re-build the local instance
npm run serve

# run unit tests
npm run test:unit

# run e2e tests using Cypress
npm run test:e2e

# run linting checking
npm run lint

# build all dist files
npm run build

# run the full test suite, including linting checking
npm run test
```

There are some other scripts available in the `scripts` section of the `package.json` file.

The default test script will do the following: lint with ESLint, unit tests with coverage and e2e tests. **Please make sure to have this pass successfully before submitting a PR.** Although the same tests will be run against your PR on the CI server, it is better to have it working locally.

## Project Structure

+   **`dist`**: contains built files for distribution. Note this directory is only updated when a release happens; they do not reflect the latest changes in development branches.

+   **`test`**: contains all tests. The unit tests are written with [**Jest**](https://jestjs.io/docs/en/getting-started) and run using [**@vue/cli-plugin-unit-jest**](https://cli.vuejs.org/core-plugins/unit-jest.html#injected-commands). The e2e tests are written with [**Cypress**](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Cypress-Can-Be-Simple-Sometimes).

+   **`src`**: contains the source code. The codebase is written in ES2015.

  +   **`components`**: contains single file components (`*.vue` files).

      This components responsibilities are of wide variety. There are core components such as `Admin`, `Resource`, and their composers, the main layout: `AppLayout` and the `Core` composer. The rest of the `src` components play a significant role, however they can entirely replaceable by customized views: Actions such as `Create`, `Show`, `Edit`, `List`; layouts: `AuthLayout`, `HomeLayout`, `UnauthorizedLayout`.
    
      > Note: this structure may change in the future

  +   **`constants`**: contains static values usually helpful to assign dom references and re-use content between the source code and test code.
  
  +   **`router`**: contains router related operations

      The *router module* relies heavily on the `vue-router` API for [**adding routes**](https://router.vuejs.org/api/#router-addroutes) and applying the [**navigation guards**](https://router.vuejs.org/guide/advanced/navigation-guards.html).

  +   **`store`**: contains code related to the [**vuex**](https://vuex.vuejs.org/guide/modules.html) modules.
  
      This set of modules currently play an important role in the application interaction.

      +   **`alerts`**: manages the snackbar and notifications system
      +   **`crud`**: creates and manages the resources modules using [**vuex-crud**](https://github.com/JiriChara/vuex-crud/#basic-usage)
      +   **`entities`**: related to form data management
      +   **`requests`**: related to ui/ux side-effects management
      +   **`resources`**: related to resources routes management
  
  +   **`va-auth`**: contains code related to the authentication and authorization interaction.
  
      It's just a [**vuex**](https://vuex.vuejs.org/guide/modules.html) module that handles authentication and authorization actions and mantains it's state. This module exports the auth types to perform any user operation to the Vue-Admin auth system.
  
  +   **`validators`**: contains code related to schema validation.

## Attribution

This Contributing Guidelines were adapted from the [Vue.js Contributing Guide][vue-js-contributing-guide].

[vue-js-contributing-guide]: https://www.contributor-covenant.org
