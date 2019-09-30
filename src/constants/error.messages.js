import templates from '@templates'

const buildMessage = templates('en.error')

function parseErrorDetails(details) {
  return details.map(detail => `\t${detail.message}`).join('\n')
}

export default {
  UNDEFINED_PROPERTY: {
    with: ({ prop, at }) => {
      return buildMessage('UNDEFINED_PROPERTY', { prop, at })
    },
  },
  INVALID_SCHEMA: {
    with: ({ prop, at, details }) => {
      const _details = parseErrorDetails(details)
      return buildMessage('INVALID_SCHEMA', { prop, at, details: _details })
    },
  },
}
