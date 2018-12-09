const Ipsum = require("bavaria-ipsum");

const ipsum = new Ipsum()

export default {
  createArticle: ({ args } = {}) => {
    // Shortens the paragraph
    const title = ipsum.generateSentence()
    const content = ipsum.generateParagraph().substring(0, 100)
    const _args = {
      id: 0,
      title,
      content
    }
    return Object.assign({}, args, _args)
  }
}
