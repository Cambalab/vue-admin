const Ipsum = require("bavaria-ipsum");

const ipsum = new Ipsum()

export default {
  createArticle: (args = {}) => {
    // Shortens the paragraph
    const title = ipsum.generateSentence()
    const content = ipsum.generateParagraph().substring(0, 100)
    const _args = {
      title,
      content
    }
    return Object.assign({}, _args, args)
  },
  apiUrl: () => { return 'http://localhost:8080/api/articles/' }
}
