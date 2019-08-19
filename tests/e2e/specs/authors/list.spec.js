import { InitEntityUtils } from '../../lib/commands'
import { rowsPerPage } from '../../../../src/constants/ui.elements.props'
import { formatDate, parseDate } from '../../../../demo/utils/dates'

import UI_CONTENT from '../../../../src/constants/ui.content.default'
import UI_NAMES from '../../../../src/constants/ui.element.names'

describe('Authors: List Test', () => {
  const resourceName = 'authors'
  const view = 'list'
  const utils = InitEntityUtils({
    resourceName,
    view
  })

  let authors
  let timesNavigatedToNextPage = 0

  before('Initialises authenticated with a default user', () => {
    cy.InitAuthenticatedUser()
  })

  before('Sets the authors fixture', () => {
    cy.fixture(resourceName).then(fixture => {
      authors = fixture
    })
  })

  afterEach('Visits the authors list', () => {
    navigateToFirstPage()
  })

  it('{GET} - When a resource / path is visited, a list of elements is returned in response', () => {
    // Setup: the stubbed route it set
    const routes = [{ name: view }]
    cy.InitServer({ resourceName, routes })
    // Exercise: visits the '/#/authors/' url
    cy.visit(`/#/${resourceName}/`)
    // Assertion: a list of authors is returned
    cy.wait(`@${resourceName}/${view}`).then(xmlHttpRequest => {
      authors = xmlHttpRequest.response.body
      const responseData = xmlHttpRequest.response.body
      expect(responseData).not.to.be.empty
      expect(authors.length).to.equal(responseData.length)
      expect(authors).to.deep.equal(responseData)
    })
   cy.server({ enable: false })
  })

   it('Visits the List View', () => {
     const url = utils.getUrlByResource({ resourceName })
     cy.url().should('eq', url)
   })

  it('Authors List View should render title', () => {
    const titleContainer = cy.getElement({
      constant: UI_NAMES.RESOURCE_VIEW_CONTAINER_TITLE,
      constantParams: { resourceName, view },
      elementType: '',
      elementProp: 'name'
    })
    const expectedTitleText = UI_CONTENT.RESOURCE_VIEW_TITLE.with({ resourceName })

    titleContainer.should('contain', expectedTitleText)
  })

  it('Authors List View should render a create button', () => {
    const createButtonElement = cy.getElement({
      constant: UI_NAMES.RESOURCE_CREATE_BUTTON,
      constantParams: { resourceName },
      elementType: 'button',
      elementProp: 'name'
    })

    createButtonElement.should('exist')
  })

  it('The list should contain authors with an {id} attribute', () => {
    const field = 'id'
    assertListElementsByField(authors, field, rowsPerPage)
  })

  it('The list should contain authors with a {name} attribute', () => {
    const field = 'name'
    assertListElementsByField(authors, field, rowsPerPage)
  })

  it('The list should contain authors with an {lastname} attribute', () => {
    const field = 'lastname'
    assertListElementsByField(authors, field, rowsPerPage)
  })

  it('The list should contain authors with an {birthdate} attribute', () => {
    const field = 'birthdate'
    const parseValue = (value) => formatDate(parseDate(value))
    assertListElementsByField(authors, field, rowsPerPage, { parseValue })
  })

  it('Authors List View should go to the Create View when the Create button is clicked', () => {
    const createButtonElement = cy.getElement({
      constant: UI_NAMES.RESOURCE_CREATE_BUTTON,
      constantParams: { resourceName },
      elementType: 'button',
      elementProp: 'name'
    })

    createButtonElement.click()
    cy.url().should('include', `/${resourceName}/create`)
  })

  /*
  * Helper functions
  */

  /**
   * assertListElementsByField - Given an list of elements, a 'field' and a
   * number, iterates through the array, finds an element field in a table row,
   * and asserts a cell's value is equal to the current elements's 'field'.
   *
   * @param {Array}  list        A list of elements
   * @param {String} field       A property name of list elements
   * @param {Number} rowsPerPage A quantity representing the rows per page of a
   * table.
   */
  const assertListElementsByField = (list, field, rowsPerPage, {
    parseValue = undefined
  } = {}) => {
    list.forEach((element, index) => {
      // Navigates to next page if necessary
      navigateToNextPage(index)
      // Setup: Gets the 'index' publisher row
      const row = utils.getTableRowBy({
        field,
        index: index % rowsPerPage
      })
      // Assertion: the input contains the author issue content
      const value = parseValue ? parseValue(element[field]) : element[field]
      row.should('contain', value)
    })
  }

  const navigateToNextPage = (index) => {
    if (index && (index % rowsPerPage === 0)) {
      const nextPageButton = cy.getElement({
        constant: '"Next page"',
        elementType: 'button',
        elementProp: 'aria-label'
      })
      nextPageButton.click()
      timesNavigatedToNextPage = timesNavigatedToNextPage + 1
    }
  }

  const navigateToFirstPage = () => {
    if (timesNavigatedToNextPage) {
      const previousPageButton = cy.getElement({
        constant: '"Previous page"',
        elementType: 'button',
        elementProp: 'aria-label'
      })
      while (timesNavigatedToNextPage > 0) {
        previousPageButton.click({ multiple: true })
        timesNavigatedToNextPage--
      }
    }
  }
})
