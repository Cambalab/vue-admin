const docs      = require('@/../package.json').directories.doc
const prefix    = 'VueAdmin'
const docsUrl   = docs
const docsPaths = {
  Resource: `${docsUrl}/Resource.md#resource-props`
}

const templates = {
  UNDEFINED_PROPERTY: ({ prop, at, url }) => `
    ${prefix}/${at}:
      It seems that the ${prop} property is undefined.
      Please refer to our documentation at ${url}
  `
}

export default {
  UNDEFINED_PROPERTY: {
    with: ({ prop, at }) => {
      const url = docsPaths[at]
      const template = templates['UNDEFINED_PROPERTY']({ prop, at, url })
      return template
    }
  }
}
