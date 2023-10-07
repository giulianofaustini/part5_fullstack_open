

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log into the blog application')
    cy.contains('username')
    cy.contains('login')
  })
})

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Giliola Cinguetti',
      username: 'gili',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log into the blog application')
    cy.contains('username')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get( '[data-cy="username"]').type('gili')
      cy.get( '[data-cy="password"]').type('salainen')
      cy.get( '[data-cy="login"]').click()

      cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get( '[data-cy="username"]').type('moli')
      cy.get( '[data-cy="password"]').type('salainen')
      cy.get( '[data-cy="login"]').click()

      cy.contains('The username or password you inserted is not valid.')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get( '[data-cy="username"]').type('gili')
      cy.get( '[data-cy="password"]').type('salainen')
      cy.get( '[data-cy="login"]').click()
      cy.contains('Add your favorite blog and share it with other users')
    })

    it.only('A blog can be created', function() {
      cy.get('[data-cy="clickForNewBlog"]').click()
      cy.get('[data-cy="write title"]').type('here we go again with a new bog in testing')
      cy.get('[data-cy="write author"]').type('Giacomino')
      cy.get('[data-cy="write url"]').type('www.giacomino.com')
      cy.get('[data-cy="create"]').click()

      cy.contains('Title: here we go again with a new bog in testing.')
    })
  })



})

