import CreateMagazines from '@demo/components/crud/magazines/CreateMagazines'
import EditMagazines from '@demo/components/crud/magazines/EditMagazines'
import ListMagazines from '@demo/components/crud/magazines/ListMagazines'
import ShowMagazines from '@demo/components/crud/magazines/ShowMagazines'
import defaults from '@components/Resource/src/defaults'

export default {
  props: {
    name: 'magazines',
    apiUrl: 'http://localhost:8888',
    resourceIdName: defaults().props.resourceIdName,
    userPermissionsField: defaults().props.userPermissionsField,
    create: CreateMagazines,
    edit: EditMagazines,
    list: ListMagazines,
    show: ShowMagazines,
    redirect: defaults().props.redirect(),
    parseResponses: defaults().props.parseResponses(),
  },
  methods: {
    storeMethods: {
      'resources/addRoute': {
        params: {
          path: '/magazines',
          name: 'magazines',
        },
      },
    },
  },
}
