# `<Resource>` component (outdated)

A `<Resource>` component maps one API endpoint to a CRUD interface.

Here there is an admin example, with list CRUD operation configured:

### App.vue

```
<template>
    <Admin>
      <Resource
        name='articles'
        :list='articlesList'
        :resourceIdName='resourceIdName'
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

export default {
  name: "App",
  components: {
    Admin: Admin,
    Resource: Resource
  },
  data() {
    return {
      articlesList,
      resourceIdName
    };
  }
};
</script>
```

The line `<Resource name="articles" />` informs Vue-Admin to fetch the “articles” records from the `http://localhost:8080/api/` URL.

Vue-Admin will fetch the `http://localhost:8080/api/articles` endpoint for data.

Under the hood, the `<Resource>` component uses Vuex-Crud:

It allows us to create and register dinamically several resources by providing an api url and a name to fetch each one of them. It gives the basic structure since it manages the crud actions for each resource at the same time that uses `vue-router` to register a route to a view (create,show, edit, list) for a specific resource.

### `<Resource>` props

-   `name`: the component uses the `name` prop both to determine the API endpoint, and to form the URL for the resource.

-   `list`: an array used to indicate how the fields should format the fetched data that will be rendered for a list of elements of a resource. The array should contain objects with information about label and field type:

    -   `label`: refers to the identifier that Vue-Admin use to fetch the correct data, it indicates which field of the record we want to render. So, each label maps a different field in the API response.
    -   `type`: indicates the tag of the html elements or components that will render that field.

-   `show`: an array used to indicate how the fields should format the fetched data that will be rendered for a single element of a resource. The array should contain objects with information about label and field type:

    -   `label`: refers to the identifier that Vue-Admin use to fetch the correct data, it indicates which field of the record we want to render. So, each label maps a different field in the API response.
    -   `type`: indicates the tag of the html elements or components that will render that field.

-   `create`: an array used to indicate how the fields should format the form to create a single element of a resource. The array should contain objects with information about label, field type and the placeholder:

    -   `label`: refers to the identifier that Vue-Admin use to fetch the correct data, it indicates which field of the record we want to render. So, each label maps a different field in the API response.
    -   `type`: indicates the tag of the html elements or components that will render that field.
    -   `placeHolder`: (optional) the text that will be showed when the field is empty. By default uses the label name.

-   `edit`: an array used to indicate how the fields should format the form to edit a single element of a resource. The array should contain objects with information about label, field type and the placeholder:

    -   `label`: refers to the identifier that Vue-Admin use to fetch the correct data, it indicates which field of the record we want to render. So, each label maps a different field in the API response.
    -   `type`: indicates the tag of the html elements or components that will render that field.
    -   `placeHolder`: (optional) text that will be showed when the field is empty. By default uses the label name.

-   `resourceIdName`: a string that represents the name of the id property in your api. By default the value is 'id'.

-   `apiUrl`: this is the url of your api.

-   `redirect`: this is an object that defines where the router should redirect on a submit action. By default the create view will be redirect to the list view and edit will redirect to the show view.

-   `parseResponses`: this is an optional object that define how Vuex-Crud should handle responses coming from the REST api. You can provide this custom methods to parse data from your API. This object must contain two functions with the property names: `parseList` and `parseSingle`. If you to see how to use it, see the basic tutorial usage.
