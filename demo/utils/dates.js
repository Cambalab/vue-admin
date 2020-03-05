import moment from 'moment'

function parseDate(date) {
  return new Date(date).toISOString(true)
}

function formatDate(date) {
  const momentDate = moment(date)
  const day = momentDate.date()
  const month = momentDate.month() + 1
  const year = momentDate.year()
  return `${day}/${month}/${year}`
}

export default {
  parseDate,
  formatDate,
}
