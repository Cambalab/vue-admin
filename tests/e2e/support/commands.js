import {
  authenticate,
  InitEntityUtils,
  getElement,
  getStore
} from '../lib/commands'
import InitServer from '../lib/server'

Cypress.Commands.add('authenticate', (args) => authenticate(args))
Cypress.Commands.add('getStore', () => getStore())
Cypress.Commands.add('InitEntityUtils', (args) => InitEntityUtils(args))
Cypress.Commands.add('getElement', (args) => getElement(args))
Cypress.Commands.add('InitServer', (args) => InitServer(args))

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
