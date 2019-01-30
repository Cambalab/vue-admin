import ERROR_MESSAGES from '@constants/error.messages'

import {
  validateSchema
} from '@validators'

/**
 * handleEmptyProp - Given a prop, throws an error with the proper user
 * feedback
 *
 * @param {String} prop The property of a component
 * @param {String} at   The name of the the error is coming from. This param is
 *                      useful add references to specific documentation on error
 *                      messages.
 */
export const handleEmptyProp = ({
  prop,
  at
}) => () => {
  const { UNDEFINED_PROPERTY } = ERROR_MESSAGES
  throw new Error(UNDEFINED_PROPERTY.with({ prop, at }))
}

/**
 * handleSchemaValidation - Given a schema, a prop and a component name, returns
 * a validation result or throws an error
 *
 * @param {Object} schema A property to validate
 * @param {String} prop   The name of the property
 * @param {String} at     The name of the component
 *
 * @return {Object} The given property
 */
export const handleSchemaValidation = ({
  schema,
  prop,
  at
}) => {
  const validation = validateSchema(prop, schema)
  if (validation.error) {
    const { INVALID_SCHEMA } = ERROR_MESSAGES
    const { details } = validation.error
    throw new Error(INVALID_SCHEMA.with({ prop, at, details }))
  }
  return validation
}
