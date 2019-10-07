import { ipsum } from '../utils'

export const createArticle = (args = {}) => {
  // Shortens the paragraph
  const title = ipsum.generateSentence()
  const content = ipsum.generateParagraph({ useStartingSentence: true })
  const _args = {
    title,
    content,
  }
  return Object.assign({}, _args, args)
}
