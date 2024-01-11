describe('Blog App E2e test', function() {

  beforeEach(function() {
    // Reset database
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    // Create a new user
    const newUser = {
      username: 'usertest',
      name: 'John Doe',
      password: 'secret'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, newUser)
    cy.visit('/')

  })

 it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
      .get('input[name="Username"]')
    cy.contains('password')
      .get('input[name="Password"]')
    cy.get('button[type="submit"]').contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('usertest')
      cy.get('#password').type('secret')
      cy.contains('login').click()
      cy.contains('Blogs')
      cy.contains('John Doe logged-in')
      cy.contains('logout')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('user1')
      cy.get('#password').type('wrong')
      cy.contains('login').click()
      cy.contains('Wrong credentials')
    })
  })



  describe('when user logged in', function() {
    beforeEach(function() {

      // Login user
      cy.login({username: 'usertest', password: 'secret'})

      // Create a new blog
      cy.createNewBlog({
        title: 'A blog created by User Test',
        author: 'User Test',
        url: 'https://www.cypress.io/'
      })

    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('A blog created by cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://www.cypress.io/')
      cy.contains('Create').click()
      cy.contains('A blog created by cypress | Cypress')

      // Check if the blog is added to the list
      cy.contains('A blog created by cypress | Cypress')
      cy.get('.blog-list')
      .children('.blog-item')
      .should('have.length', 2)

    })


    it('a blog can be liked', function() {

  
      cy.get('.blog-list')
      .children('.blog-item')
      .first()
      .get('.blog-overview')
      .get('button')
      .contains('View more')
      .click()
  
      cy.get('.blog-content')
      .get('.blog-likes').as('likes')
      .contains('likes: 0')
      
      cy.get('@likes')
      .get('button')
      .contains('like')
      .click()
  
      cy.get('@likes')
      .contains('likes: 1')
  
    })

    it('a blog can be deleted', function() {

      cy.get('.blog-list')
      .children('.blog-item')
      .first()
      .get('.blog-overview')
      .get('button')
      .contains('View more')
      .click()

      cy.get('button')
      .contains('remove')
      .click()

      cy.get('.blog-list')
      .children('.blog-item')
      .should('have.length', 1)

    })
    

  })

})