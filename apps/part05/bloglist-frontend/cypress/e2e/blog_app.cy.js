describe('Blog App E2e test', function() {

  beforeEach(function() {

    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const newUser = {
      username: 'user1',
      name: 'John Doe',
      password: 'secret'
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, newUser)
    cy.visit('/')

  })

  it('Front page can be opened', () => {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
    cy.contains('Wrong credentials')
  })

  it('user can login', function() {
 
    cy.get('#username').type('user1')
    cy.get('#password').type('secret')
    cy.contains('login').click()
    cy.contains('Blogs')
  })

})