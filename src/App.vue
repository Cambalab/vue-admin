<template>
    <Admin>
      <Resource
        name='articles'
        :list='articlesList'
        :show='articlesShow'
        :create='fieldsArticleCreate'
        :edit='fieldsArticleEdit'
        :resourceId='resourceId'
        :parseResponses='parseResponses'
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

const resourceId = "_id"

const parseFeathersResponses = {
  parseList: (response) => {
    const { data } = response;
    return Object.assign({}, response, {
      data: data.data // expecting array of objects with IDs
    });
  },
  parseSingle: (response) => {
    const { data } = response;
    return Object.assign({}, response, {
      data // expecting object with ID
    });
  }
}

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
      // #23 - To use the default server just remove the parseResponses attribute
      // below, the property passed to Resource in the template and update the
      // resourceId to 'id'. - sgobotta
      parseResponses: parseFeathersResponses
    };
  }
};
</script>
