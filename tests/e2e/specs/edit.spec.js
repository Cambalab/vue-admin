// https://docs.cypress.io/api/introduction/api.html

const Factory = require('../factory')
const { queryElementByProp } = require('../helpers')

const UI_CONTENT = require('../../../src/constants/ui.content.default')
const UI_NAMES = require('../../../src/constants/ui.element.names')

describe('Edit Test', () => {
  let article = {}
  let newArticle = {}

  before('Create an article', () => {
    const url = Factory.apiUrl({ route: 'api/articles/' })
    cy.request('POST',url , Factory.createArticle())
      .then((res) => { article = res.body })
  })

  before('Create a new article to edit the fields content', () => {
    newArticle = Factory.createArticle()
  })

  before('Visits the created article with the Show view', () => {
    cy.visit('/#/magazines')
    const url = `articles/show/${article.id}`
    cy.visit(`/#/${url}`)
    cy.url().should('include', url)
  })

  before('Click in the Edit button of the Show view', () => {
    const editButtonName = UI_NAMES.RESOURCE_ID_EDIT_BUTTON.with({
      resourceName: 'articles'
    })
    const editButtonElement = queryElementByProp({
      type: 'button',
      prop: 'name',
      value: editButtonName
    })
    cy.get(editButtonElement).should((editButtonLink) => {
      expect(editButtonLink).to.contain(UI_CONTENT.RESOURCE_EDIT_BUTTON)
    }).click()
  })

  it('Articles Show Edit should render title: Articles', () => {
    cy.get(editViewDivContainerQuery('RESOURCE_VIEW_CONTAINER')).should((editViewContainer) => {
      const editViewTitleContainer = editViewContainer.find(editViewDivContainerQuery('RESOURCE_VIEW_CONTAINER_TITLE'))
      const editViewTitleText = UI_CONTENT.RESOURCE_VIEW_TITLE.with({
        resourceName: 'articles'
      })
      expect(editViewTitleContainer).to.contain(editViewTitleText)
    })
  })

  it('Articles Edit view should contain a title field', () => {
    articlesEditViewShouldContainsTheField('title', article.title)
  })

  it('Articles Edit view should contain a content field', () => {
    articlesEditViewShouldContainsTheField('content', article.content)
  })

  it('Articles Edit view should edit a title field', () => {
    editField('title', newArticle.title)
    articlesEditViewShouldContainsTheField('title', newArticle.title)
  })

  it('Articles Edit view should edit a content field', () => {
    editField('content', newArticle.content)
    articlesEditViewShouldContainsTheField('content', newArticle.content)
  })

  it('Press the save button and redirect to the Show view', () => {
    const saveButtonContainerName = UI_NAMES.RESOURCE_VIEW_SUBMIT_BUTTON.with({
      resourceName: 'articles',
      view: 'edit'
    })
    const saveButtonContainerQuery = queryElementByProp({
      prop: 'name',
      value: saveButtonContainerName
    })

    cy.get(saveButtonContainerQuery).should((editSubmitButton) => {
      expect(editSubmitButton).to.contain(UI_CONTENT.EDIT_SUBMIT_BUTTON)
    }).click()

    const url = `articles/show/${article.id}`
    cy.url().should('include', url)
  })

  it('The title field was saved with the new content', () => {
    theFieldwasSavedWithTheNewContent('title')
  })

  it('The content field was saved with the new content', () => {
    theFieldwasSavedWithTheNewContent('content')
  })

  /**
  * Helper functions
  **/

  function editViewDivContainerQuery(containerType) {
    const editViewContainerName = UI_NAMES[containerType].with({
      resourceName: 'articles',
      view: 'edit'
    })

    return queryElementByProp({
      type: 'div',
      prop: 'name',
      value: editViewContainerName
    })
  }

  function theFieldwasSavedWithTheNewContent(field) {
    const fieldContainerName = UI_NAMES.RESOURCE_VIEW_CONTAINER_FIELD.with({
      resourceName: 'articles',
      view: 'show',
      field
    })
    const fieldContainerQuery = queryElementByProp({
      type:'div',
      prop: 'name',
      value: fieldContainerName
    })

    cy.get(fieldContainerQuery).should((fieldContainer) => {
      expect(fieldContainer).to.contain(newArticle[field])
    })
  }

  function editField(field, content) {
    cy.get(queryToField(field))
      .focus()
      .clear()
      .type(content)
  }

  function queryToElementWith(containerType, containerParams){
    const containerName = UI_NAMES[containerType].with(containerParams)
    return queryElementByProp({
      type: 'input',
      prop: 'name',
      value: containerName
    })
  }

  function queryToField(field) {
    return queryToElementWith('RESOURCE_VIEW_CONTAINER_FIELD', {
      resourceName: 'articles',
      view: 'edit',
      field
    })
  }

  function articlesEditViewShouldContainsTheField(field, expectedContent) {
    cy.get(queryToField(field)).should('have.value', expectedContent)
  }
})
