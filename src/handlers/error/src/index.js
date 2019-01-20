import ERROR_MESSAGES from '@constants/error.messages'

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
