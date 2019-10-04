import { ipsum, randomDate } from '../utils'

export const createAuthor = (args = {}) => {
  // Shortens the paragraph
  const name = ipsum.generateWord()
  const lastname = ipsum.generateWord()
  const birthdate = randomDate(
    new Date(1970, 1, 1, 0, 0, 0, 0),
    new Date(1980, 1, 1, 0, 0, 0, 0)
  ).toISOString()
  const _args = {
    name,
    lastname,
    birthdate,
  }
  return Object.assign({}, _args, args)
}
