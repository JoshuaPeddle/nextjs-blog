
/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

// Cypress E2E Test
describe('Navigation', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('/')

    // Find a link with an href attribute containing "about" and click it
    console.log( cy.get('a[href*="about"]'))
    cy.get('a[href*="/about"]').click()

    // The new url should include "/about"
    cy.url().should('include', '/about')

    // The new page should contain an h1 with "About page"
    cy.get('h1').contains('About')
  })
})


describe('Post creation, edit and deletion', () => {
  it('Submit new post', () => {
    // Start from the index page
    cy.visit('/editor')

    // Find a link with an href attribute containing "about" and click it
    console.log( cy.get('a[href*="about"]'))

    cy.get('#titleInput').type('Hello World')

    cy.get('.CodeMirror-scroll').type('Hello World')
    // The new url should include "/about"
    cy.get('#saveNewPost').click()
    //cy.wait(1000)
  })

  it('Check that the note exists', () => {
    cy.visit('/')

    cy.get('a').contains('Hello World').click()

    cy.get('p').contains('Hello World')
    //cy.wait(1000)
  })

  it('Edit the post', () => {
    // Start from the index page
    cy.visit('/editor')

    // Find a link with an href attribute containing "about" and click it
    cy.get('#editButton').first().click()
    cy.get('#titleInput').type('Title')

    cy.get('.CodeMirror-scroll').type('1234567')

    // The new url should include "/about"
    cy.get('#saveNewPost').click()
    //cy.wait(1000)
  })

  it('Check that the edited note exists', () => {
    cy.visit('/')

    cy.get('a').contains('Title').click()

    cy.get('p').contains('Hello World1234567')
    cy.wait(1000)
  })

  it('Delete the note', () => {
    // Start from the index page
    cy.visit('/editor')

    // Find a link with an href attribute containing "about" and click it
    cy.get('#deleteButton').first().click()

    cy.visit('/')

    cy.get('a').contains('1234567').should('not.exist')
    cy.get('a').contains('Hello World').should('not.exist')
    //cy.wait(1000)
  })

})

// Prevent TypeScript from reading file as legacy script
export {}