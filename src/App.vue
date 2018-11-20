<template>
    <Admin>
      <Resource
        name='articles'
        :list='articlesList'
        :show='articlesShow'
        :create='fieldsArticleCreate'
        >
      </Resource>
    </Admin>
</template>

<script>
import Admin from "./components/Admin";
import Resource from "./components/Resource";

const articlesList = [
{
  'id':1,
  'label':'title',
  'type':'TextField',
  'tag':'h2'
}]

const articlesShow =[
{
  'id':1,
  'label':'id',
  'type':'TextField',
  'tag':'h2'
},
{
  'id':2,
  'label':'title',
  'type':'TextField',
  'tag':'h1'
},
{
  'id':3,
  'label':'content',
  'type':'TextField',
  'tag':'p'
}]

const fieldsArticleCreate =[
{
  'id':1,
  'label':'title',
  'type':'Input',
  'placeHolder':'Title'
},
{
  'id':2,
  'label':'content',
  'type':'Input',
  'placeHolder':'Content'
}]

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
      fieldsArticleCreate
    };
  }
};
</script>
