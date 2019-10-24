/**
 * Compose - Given a function that creates VNodes and a context, composes the
 * View using it's default values
 *
 * @param {Function} createElement  The first param of the render function
 * @param {Object}   context        The second param of the render function
 * @param {Object}   component      A view component to be wrapped
 * @param {String}   view           The name of the view that is being composed
 *
 * @return {VNode} A Vue component
 */
export default (createElement, context, { component }) => {
  const { composer } = require(`./${component.name}/defaults.js`).default()
  const { parentPropKeys, componentPropKeys, childrenAdapter } = composer

  return compose(
    createElement,
    context,
    {
      component,
      parentPropKeys,
      componentPropKeys,
      childrenAdapter,
    }
  )
}

/**
 * compose - Given a createElement function, a context and a set of options,
 * composes the 'component' using the given options
 *
 * @param {Function} createElement   A function that creates VNodes
 * @param {Object}   context         The render context
 * @param {Object}   component       A Vue component
 * @param {Array}    parentPropKeys  The keys to extract from the parent
 * @param {Object}   childrenAdapter The data to extract from the children
 *
 * @return {VNode} A Vue component
 */
function compose(
  createElement,
  context,
  { component, parentPropKeys, componentPropKeys, childrenAdapter }
) {
  // TODO: this should be the right place to handle View component misusing.
  // Use case: a user instance it as a component in a template without passing
  // any children with a source property - @sgobotta

  // If the View is being used in a user template it should contain children with
  // a source property, then they are processed and passed as props to the
  // View component
  if (context.children) {
    // Gets the context children and the parent component associated by Resource
    // during the binding.
    const {
      children,
      parent: { $attrs: parentAttrs },
      data: { attrs: componentAttrs = {} },
    } = context
    // Extracts the parent props that should be passed to the View
    const parentProps = parentPropKeys.reduce((props, key) => {
      if (parentAttrs[key]) props[key] = parentAttrs[key]
      return props
    }, {})
    // Extracts the component props that should be passed to itself
    const componentProps = componentPropKeys.reduce((props, key) => {
      props[key] = componentAttrs[key]
      return props
    }, {})
    // Composes the View children into an array of elements
    // TODO: this could probably be done in the future by passing components
    // instead of building an array for Show
    const fields = children.map(child => {
      const {
        data: { attrs },
        tag,
      } = child

      const childrenAdapterKeys = Object.keys(childrenAdapter)
      const childrenProps = childrenAdapterKeys.reduce((props, key) => {
        props[childrenAdapter[key]] = attrs[key]
        return props
      }, {})

      const customProps = Object.keys(attrs)
        .filter(key => childrenAdapterKeys.indexOf(key) < 0)
        .reduce((props, key) => {
          props[key] = attrs[key]
          return props
        }, {})

      return { ...childrenProps, ...customProps, tag }
    })
    const props = { ...parentProps, ...componentProps, fields }
    return createElement(component, { props })
  }
  // The View is already being instanced by Resource as an Array
  return createElement(component, context)
}
