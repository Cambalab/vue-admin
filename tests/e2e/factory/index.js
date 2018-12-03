const Ipsum = require("bavaria-ipsum");

const ipsum = new Ipsum()

export default {
  createArticle: ({ id }) => {
    return {
      id,
      title: ipsum.generateSentence(),
      content: ipsum.generateParagraph()
    }
  }
}
