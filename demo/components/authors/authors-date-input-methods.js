function parseDate (aDate) {
  const [day, month, year] = aDate.split('/')
  return { day, month, year }
}

function formatDate ({ day, month, year }) {
  return `${day}/${month}/${year}`
}

function validDate (aDate) {
  const rgx = new RegExp(/\d{2}\/\d{2}\/\d{4}/)
  return rgx.test(aDate)
}

export default {
  parseDate,
  formatDate,
  validDate
}