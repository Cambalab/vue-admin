import Joi from 'joi'

function formatResult(result) {
  if (result.error) {
    const { name, details } = result.error
    const error = { name, details }
    return { error }
  }
  return result.value
}

/**
 * validateRedirect - Given an object checks it has a valid redirect schema
 *
 * @param {Object} redirect An object
 *
 * @return {Object} A Joi object with the validation review
 */
export const validateRedirect = (redirect) => {
  const joiResult = Joi.object().keys({
    views: Joi.object().keys({
      create: Joi.string().valid(['edit', 'list', 'show']),
      edit: Joi.string().valid(['create', 'list', 'show'])
    })
  }).validate(redirect)
  return formatResult(joiResult)
}
