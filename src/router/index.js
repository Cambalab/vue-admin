
const Router = {}

Router.redirect = ({ router, resource, view, id }) => {
  ({
    list: () => { router.push({ name: `${resource}/${view}` }) },
    show: () => { router.push({ name: `${resource}/${view}`, params: { id } }) }
  })[view]()
}

export default Router
