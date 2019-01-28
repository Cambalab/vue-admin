
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
  // TODO: this should be the right place to handle List component misusing.
  // Use case: a user instance it as a component in a template without passing
  // any children with a source property - @sgobotta

  // If List is being used in a user template it should contain children with
  // a source property, then they are processed and passed as props to the
  // List view component
  if (context.children) {
    // Gets the list component associated by Resource during the binding.
    const { children, parent: { $attrs } } = context
    // Gets the props that should be passed to List
    const {
      resourceName,
      resourceIdName,
      hasCreate,
      hasShow,
      hasEdit,
      va
    } = $attrs

    // Composes the List children into an array of elements
    // TODO: this could probably be done in the future by passing components
    // instead of building an array for List
    const fields = children.map(child => {
      const { data: { attrs }, tag } = child
      const {
        alignContent,
        alignHeader,
        headerText,
        source,
        sortable,
      } = attrs

      return {
        align: alignContent,
        alignHeader,
        headerText,
        label: source,
        sortable,
        tag,
      }
    })

    const props = {
      resourceName,
      resourceIdName,
      hasCreate,
      hasShow,
      hasEdit,
      fields,
      va
    }
    return createElement(component, { props })
  }
  // List is already being instanced by Resource as an Array
  return createElement(component, context)
}

function composeShow(createElement, context, { component }) {
  // TODO: this should be the right place to handle Create component misusing.
  // Use case: a user instance it as a component in a template without passing
  // any children with a source property - @sgobotta

  // If Create is being used in a user template it should contain children with
  // a source property, then they are processed and passed as props to the
  // Create view component
  if (context.children) {
    // Gets the list component associated by Resource during the binding.
    const { children, parent: { $attrs } } = context
    // Gets the props that should be passed to Create
    const {
      resourceName,
      redirect,
      va
    } = $attrs

    // Composes the Create children into an array of elements
    // TODO: this could probably be done in the future by passing components
    // instead of building an array for Create
    const fields = children.map(child => {
      const { data: { attrs }, tag } = child
      const {
        source,
        placeHolder
      } = attrs

      return {
        label: source,
        placeHolder,
        tag
      }
    })

    const props = {
      resourceName,
      fields,
      redirect,
      va
    }
    return createElement(component, { props })
  }
  // Create is already being instanced by Resource as an Array
  return createElement(component, context)
}

function composeCreate(createElement, context, { component }) {
  // TODO: this should be the right place to handle Edit component misusing.
  // Use case: a user instance it as a component in a template without passing
  // any children with a source property - @sgobotta

  // If Edit is being used in a user template it should contain children with
  // a source property, then they are processed and passed as props to the
  // Edit view component
  if (context.children) {
    // Gets the list component associated by Resource during the binding.
    const { children, parent: { $attrs } } = context
    // Gets the props that should be passed to Edit
    const {
      resourceName,
      redirect,
      va
    } = $attrs

    // Composes the Edit children into an array of elements
    // TODO: this could probably be done in the future by passing components
    // instead of building an array for Edit
    const fields = children.map(child => {
      const { data: { attrs }, tag } = child
      const {
        source,
        placeHolder
      } = attrs

      return {
        label: source,
        placeHolder,
        tag
      }
    })

    const props = {
      resourceName,
      fields,
      redirect,
      va
    }
    return createElement(component, { props })
  }
  // Edit is already being instanced by Resource as an Array
  return createElement(component, context)
}

function composeEdit(createElement, context, { component }) {
  // TODO: this should be the right place to handle Show component misusing.
  // Use case: a user instance it as a component in a template without passing
  // any children with a source property - @sgobotta

  // If Show is being used in a user template it should contain children with
  // a source property, then they are processed and passed as props to the
  // Show view component
  if (context.children) {
    // Gets the list component associated by Resource during the binding.
    const { children, parent: { $attrs } } = context
    // Gets the props that should be passed to List
    const {
      resourceName,
      va
    } = $attrs

    // Composes the Show children into an array of elements
    // TODO: this could probably be done in the future by passing components
    // instead of building an array for Show
    const fields = children.map(child => {
      const { data: { attrs }, tag } = child
      const {
        source
      } = attrs

      return {
        label: source,
        tag
      }
    })

    const props = {
      resourceName,
      fields,
      va
    }
    return createElement(component, { props })
  }
  // Show is already being instanced by Resource as an Array
  return createElement(component, context)
}
