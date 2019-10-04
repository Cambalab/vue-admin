const Ipsum = require('bavaria-ipsum')

export const ipsum = new Ipsum({
  startSentence: 'Vue Admin aspera iaspis',
  minSentenceWords: 2,
  maxSentenceWords: 6,
  minParagraphSentences: 1,
  maxParagraphSentences: 3,
})

export const numbers = {
  randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  },
}

export const randomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}
