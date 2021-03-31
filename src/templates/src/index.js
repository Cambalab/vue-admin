const docsUrl = require('@/../package.json').directories.doc

const errorTitle = '\n\nVueAdmin/{at}:\n\n'
const errorFooter =
  '{errorMessage}\tTake a look at our documentation at {url}\n'

// Component doc paths should be added here
const componentsDocs = {
  Admin: '{docsUrl}/Admin/Admin.md#props',
  Resource: '{docsUrl}/Resource/Resource.md#props',
  DateField: '{docsUrl}/Ui-Components/DateField.md',
}

/**
 * withParams - Defines the interpolation symbol of a template
 */
function withParams(key) {
  return `{${key}}`
}

/**
 * buildMessage - Given a message and a set of parameters, interpolates the
 * string to return another message
 *
 * @param {String} message A string containing a template message
 * @param {Object} args    A set of properties to complete a template message
 *
 * @return {String} A message built with args
 */
function buildMessage(message, args) {
  const paramKeys = Object.keys(args)
  return paramKeys.reduce((parsedMessage, paramKey) => {
    return parsedMessage.replace(withParams(paramKey), args[paramKey])
  }, message)
}

/**
 * Templates - Given the name of a resource, returns a builder function to
 * create error messages.
 *
 * @param {String} template A string containing the language and type of error
 * of a template, e.g.: 'en.error'
 *
 * @return {Function} A builder function of messageType
 */
export default template => {
  const params = template.split('.')
  const language = params[0]
  const messageType = params[1]
  const messages = require(`./${language}/${messageType}.json`)

  /**
   * buildErrorMessage - Given a template constant and a set of params, returns
   * an error message
   *
   * @param {String} constant      The name of a template message
   * @param {Object} messageParams An object containing params to fill a constant
   *
   * @return {String} An error message built with messageParams
   */
  function buildErrorMessage(constant, messageParams) {
    const { at } = messageParams
    const componentDoc = componentsDocs[at]
    const prefix = buildMessage(errorTitle, { at })
    const url = buildMessage(componentDoc, { docsUrl })
    Object.assign(messageParams, { prefix })
    const errorMessage = buildMessage(messages[constant], messageParams)

    return buildMessage(errorFooter, { errorMessage, url })
  }

  const messageTypes = {
    error: buildErrorMessage,
    // newMessages: buildNewMessage
  }

  return messageTypes[messageType]
}
