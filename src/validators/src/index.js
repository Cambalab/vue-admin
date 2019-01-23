import {
  validateRedirect
} from './components/resource'

function validateSchema(prop, schema) {
  const validations = {
    redirect: validateRedirect
    // add more properties here, binded with a validation function
  }
  return validations[prop](schema)
}

export {
  validateSchema
}
