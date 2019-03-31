
export const initialResourcesRoutes = (resources) => {
  return resources.map(resource => {
    return {
      path: `/${resource}`,
      name: resource
    }
  })
}
