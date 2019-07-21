function parseDate (aDate) {
  const [year, month, day] = aDate.substr(0, 10).split('-')
  return { day, month, year }
}

function formatDate ({ day, month, year }) {
  return `${month}/${day}/${year}`
}

function validDate (aDate) {
  const rgx = new RegExp(/\d{4}\/\d{2}\/\d{2}/)
  return rgx.test(aDate)
}

export default {
  parseDate,
  formatDate,
  validDate
}
