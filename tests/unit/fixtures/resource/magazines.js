import CreateMagazines from '../../../../demo/components/CreateMagazines'
import EditMagazines from '../../../../demo/components/EditMagazines'
import ListMagazines from '../../../../demo/components/ListMagazines'
import ShowMagazines from '../../../../demo/components/ShowMagazines'
import defaults from '../../../../src/components/Resource/src/defaults'

export default {
  props: {
    name: 'magazines',
    apiUrl: 'http://localhost:8080',
    resourceIdName: 'id',
    create: CreateMagazines,
    edit: EditMagazines,
    list: ListMagazines,
    show: ShowMagazines,
    redirect: defaults().props.redirect(),
    parseResponses: defaults().props.parseResponses()
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
