const Ipsum = require("bavaria-ipsum");

const ipsum = new Ipsum()

export default {
  createArticle: ({ args } = {}) => {
    const _args = {
      id: 0,
      title: ipsum.generateSentence(),
      content: ipsum.generateParagraph()
    }
    return Object.assign({}, args, _args)
  }
}
