import { ipsum, numbers } from '../utils'

export const createMagazine = (args = {}) => {
  const name = ipsum.generateSentence()
  const issue = `#${numbers.randomBetween(1, 500)}`
  const publisher = ipsum.generateParagraph(1, { useStartingSentence: true })
  const _args = {
    name,
    issue,
    publisher,
  }
  return Object.assign({}, _args, args)
}
