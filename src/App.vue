<template>
    <Admin>
      <Resource
        name='articles'
        :list='articlesList'
        :show='articlesShow'
        :create='fieldsArticleCreate'
        :edit='fieldsArticleEdit'
        :resourceId='resourceId'
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

const resourceId = "id"

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
      resourceId
    };
  }
};
</script>
