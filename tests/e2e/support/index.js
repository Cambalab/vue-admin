// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import moment from 'moment'
import './commands'

function isOctober() {
  const today            = moment()
  const year             = today.year()
  const format           = 'MM-DD-YYYY'
  const octoberStartDate = moment(`10-01-${year}`, format)
  const octoberEndDate   = moment(`10-31-${year}`, format)
  return today.isBetween(octoberStartDate, octoberEndDate)
}

isOctober() ? require('cypress-dark/src/halloween') : require('cypress-dark')
