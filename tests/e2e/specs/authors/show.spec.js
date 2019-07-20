import { queryElementByProp } from '../../helpers'
import dateInputMethods from '../../../../demo/components/authors/authors-date-input-methods'

import UI_CONTENT from '../../../../src/constants/ui.content.default'
import UI_NAMES from '../../../../src/constants/ui.element.names'

describe('Authors: Show Test', () => {
  const resourceName = 'authors'
  const view = 'show'
  const author = {}

  before('Initialises authenticated with a default user', () => {
    cy.InitAuthenticatedUser()
  })

  before('Search an author to show', () => {
    cy.fixture(resourceName).then(fixture => {
      // Takes the first element of the fixture to use as subject
      Object.assign(author, fixture[0])
    })
  })

  before('Initialises the server', () => {
    // Inits the server with a stubbed get endpoint
    const routes = [{ name: view, response: author }]
    cy.InitServer({ resourceName, routes })
  })

  it('Visits the authors show', () => {
    // Exercise: visits the show view
    cy.visit(`/#/${resourceName}/${view}/${author.id}`)
    cy.server({ enable: false })
    // Assertion: the url should match the show view url
    cy.url().should('include', `${resourceName}/${view}/${author.id}`)
  })

  it('Authors Show View should render title: Authors', () => {
    const showViewTitleText = UI_CONTENT.RESOURCE_VIEW_TITLE.with({ resourceName })

    cy.getElement({
      constant: UI_NAMES.RESOURCE_VIEW_CONTAINER_TITLE,
      constantParams: { resourceName, view },
      elementType: 'div',
      elementProp: 'name'
    }).should('contain', showViewTitleText)
  })

  it('Authors Show View should contain the id field', () => {
    shouldContainFieldWithValue('id', author.id)
  })

  it('Authors Show View should contain the name field', () => {
    shouldContainFieldWithValue('name', author.name)
  })

  it('Authors Show View should contain the lastname field', () => {
    shouldContainFieldWithValue('lastname', author.lastname)
  })

  it('Authors Show View should contain the birthdate field', () => {
    const { formatDate, parseDate } = dateInputMethods
    const birthdate = formatDate(parseDate(author.birthdate))
    shouldContainFieldWithValue('birthdate', birthdate)
  })

  /**
  * Helper functions
  **/
  function queryToElementWith(containerType, containerParams){
    const containerName = UI_NAMES[containerType].with(containerParams)
    return queryElementByProp({
      type: 'div',
      prop: 'name',
      value: containerName
    })
  }

  function queryToElement(containerType) {
    return queryToElementWith(containerType, { resourceName, view })
  }

  function shouldContainFieldWithValue(field, value) {
    cy.get(queryToElement('RESOURCE_VIEW_CONTAINER_FIELDS'))
      .should((fieldsContainerRes) => {
        const fieldContainerElement = queryToElementWith('RESOURCE_VIEW_CONTAINER_FIELD', {
          resourceName,
          view,
          field
        })
        const fieldContainer = fieldsContainerRes.find(fieldContainerElement)
        expect(fieldContainer).to.contain(value)
      })
  }
})
