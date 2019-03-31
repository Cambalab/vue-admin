import { InitEntityUtils } from '../../lib/commands'
import { rowsPerPage } from '../../../../src/constants/ui.elements.props'

const UI_CONTENT = require('../../../../src/constants/ui.content.default')
const UI_NAMES = require('../../../../src/constants/ui.element.names')


describe('Articles: List Test', () => {
  const resourceName = 'articles'
  const view = 'list'
  const utils = InitEntityUtils({
    resourceName,
    view
  })

  let articles
  let timesNavigatedToNextPage = 0

  before('Initialises authenticated with a default user', () => {
    cy.InitAuthenticatedUser()
  })

  before('Sets the articles fixture', () => {
    cy.fixture(resourceName).then(fixture => {
      articles = fixture
    })
  })

  afterEach('Visits the articles list', () => {
    navigateToFirstPage()
  })

  it('{GET} - When a resource / path is visited, a list of elements is returned in response', () => {
    // Setup: the stubbed route it set
    const routes = [{ name: view }]
    cy.InitServer({ resourceName, routes })
    // Exercise: visits the '/#/articles/' url
    cy.visit(`/#/${resourceName}/`)
    // Assertion: a list of articles is returned
    cy.wait(`@${resourceName}/${view}`).then(xmlHttpRequest => {
      articles = xmlHttpRequest.response.body
      const responseData = xmlHttpRequest.response.body
      expect(responseData).not.to.be.empty
      expect(articles.length).to.equal(responseData.length)
      expect(articles).to.deep.equal(responseData)
    })
   cy.server({ enable: false })
  })

   it('Visits the List View', () => {
     const url = utils.getUrlByResource({ resourceName })
     cy.url().should('eq', url)
   })

  it('Articles List View should render title', () => {
    const titleContainer = cy.getElement({
      constant: UI_NAMES.RESOURCE_VIEW_CONTAINER_TITLE,
      constantParams: { resourceName, view },
      elementType: '',
      elementProp: 'name'
    })
    const expectedTitleText = UI_CONTENT.RESOURCE_VIEW_TITLE.with({ resourceName })

    titleContainer.should('contain', expectedTitleText)
  })

  it('Articles List View should render a create button', () => {
    const createButtonElement = cy.getElement({
      constant: UI_NAMES.RESOURCE_CREATE_BUTTON,
      constantParams: { resourceName },
      elementType: 'a',
      elementProp: 'name'
    })
    const expectedCreateButtonText = UI_CONTENT.RESOURCE_CREATE_BUTTON

    createButtonElement.should('contain',expectedCreateButtonText)
  })

  it('The list should contain articles with an {id} attribute', () => {
    const field = 'id'
    assertListElementsByField(articles, field, rowsPerPage)
  })

  it('The list should contain articles with a {title} attribute', () => {
    const field = 'title'
    assertListElementsByField(articles, field, rowsPerPage)
  })

  it('The list should contain articles with an {content} attribute', () => {
    const field = 'content'
    assertListElementsByField(articles, field, rowsPerPage)
  })

  it('Articles List View should go to the Create View when the Create button is clicked', () => {
    const createButtonElement = cy.getElement({
      constant: UI_NAMES.RESOURCE_CREATE_BUTTON,
      constantParams: { resourceName },
      elementType: 'a',
      elementProp: 'name'
    })
    const expectedCreateButtonText = UI_CONTENT.RESOURCE_CREATE_BUTTON

    createButtonElement.should('contain', expectedCreateButtonText).click({ force: true })
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
  const assertListElementsByField = (list, field, rowsPerPage) => {
    list.forEach((element, index) => {
      // Navigates to next page if necessary
      navigateToNextPage(index)
      // Setup: Gets the 'index' publisher row
      const row = utils.getTableRowBy({
        field,
        index: index % rowsPerPage
      })
      // Assertion: the input contains the article issue content
      row.should('contain', element[field])
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
