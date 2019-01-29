
export default (createElement, context, {
  component,
  view
}) => {
  const views = {
    list: composeList,
    show: composeShow,
    create: composeCreate,
    edit: composeEdit
  }

  return views[view](createElement, context, { component })
}

function composeList(createElement, context, { component }) {
  const parentPropKeys = [
    'resourceName',
    'resourceIdName',
    'hasCreate',
    'hasShow',
    'hasEdit',
    'va'
  ]

  const childrenAdapter = {
    alignContent: 'align',
    alignHeader: 'alignHeader',
    headerText: 'headerText',
    sortable: 'sortable',
    source: 'label'
  }

  return compose(createElement, context, {
    component,
    parentPropKeys,
    childrenAdapter
  })
}

function composeShow(createElement, context, { component }) {
  const parentPropKeys = [
    'resourceName',
    'redirect',
    'va'
  ]

  const childrenAdapter = {
    placeHolder: 'placeHolder',
    source: 'label'
  }

  return compose(createElement, context, {
    component,
    parentPropKeys,
    childrenAdapter
  })
}

function composeCreate(createElement, context, { component }) {
  const parentPropKeys = [
    'resourceName',
    'redirect',
    'va'
  ]

  const childrenAdapter = {
    placeHolder: 'placeHolder',
    source: 'label'
  }

  return compose(createElement, context, {
    component,
    parentPropKeys,
    childrenAdapter
  })
}

function composeEdit(createElement, context, { component }) {
  const parentPropKeys = [
    'resourceName',
    'va'
  ]

  const childrenAdapter = {
    placeHolder: 'placeHolder',
    source: 'label'
  }

  return compose(createElement, context, {
    component,
    parentPropKeys,
    childrenAdapter
  })
}


function compose(createElement, context, {
  component,
  parentPropKeys,
  childrenAdapter
}) {
  // TODO: this should be the right place to handle View component misusing.
  // Use case: a user instance it as a component in a template without passing
  // any children with a source property - @sgobotta

  // If the View is being used in a user template it should contain children with
  // a source property, then they are processed and passed as props to the
  // View component
  if (context.children) {
    // Gets the context children and the parent component associated by Resource
    // during the binding.
    const { children, parent: { $attrs } } = context
    // Extracts the props that should be passed to the View
    const parentProps = parentPropKeys.reduce((props, key) => {
      props[key] = $attrs[key]
      return props
    }, {})
    // Composes the View children into an array of elements
    // TODO: this could probably be done in the future by passing components
    // instead of building an array for Show
    const fields = children.map(child => {
      const { data: { attrs }, tag } = child

      const childrenProps = Object.keys(childrenAdapter).reduce((props, key) => {
        props[childrenAdapter[key]] = attrs[key]
        return props
      }, {})

      return {
        ...childrenProps,
        tag
      }
    })

    const props = {
      ...parentProps,
      fields
    }
    return createElement(component, { props })
  }
  // The View is already being instanced by Resource as an Array
  return createElement(component, context)

}
