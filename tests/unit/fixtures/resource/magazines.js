import CreateMagazines from '../../../../demo/components/CreateMagazines'
import EditMagazines from '../../../../demo/components/EditMagazines'
import ListMagazines from '../../../../demo/components/ListMagazines'
import ShowMagazines from '../../../../demo/components/ShowMagazines'

export default {
  props: {
    name: 'magazines',
    apiUrl: 'http://localhost:8080',
    resourceIdName: 'id',
    create: CreateMagazines,
    edit: EditMagazines,
    list: ListMagazines,
    show: ShowMagazines,
    redirect: {
      views: {
        create: 'list',
        edit: 'show'
      }
    },
    parseResponses: {
      single: null,
      list: null
    }
  },
  methods: {
    storeMethods: {
      'resources/addRoute': {
        params: {
          path: '/magazines',
          name: 'magazines'
        }
      }
    }
  }
}
