describe('Blog app', function () {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset');

    const user = {
      name: 'admin',
      username: 'admin',
      password: 'admin'
    };
    cy.request('POST', 'http://localhost:3000/api/users/', user);

    cy.visit('http://localhost:3000');
  });

  it('front page has login form', function () {
    cy.contains('BLOGS');
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  it('login fails with wrong password', function() {
    // Without credentials
    cy.contains('login').click();
    cy.contains('Wrong');

    // Wrong credentials
    cy.get('#username').type('admin');
    cy.get('#password').type('wrong');
    cy.get('#button_login').click();
    cy.contains('Wrong');
  });

  it('login form and logout button works', function() {
    cy.get('#username').type('admin');
    cy.get('#password').type('admin');
    cy.get('#button_login').click();
    cy.contains('Logged in');

    cy.contains('Logout').click();
  });


  describe('when logged in', function() {
    beforeEach(function () {
      cy.login({username: 'admin', password: 'admin'});
    });

    it('a blog can be created', function() {
      cy.contains('New Blog').click();
      cy.get('#Title').type('TestTitle');
      cy.get('#Author').type('TestAuthor');
      cy.get('#Url').type('TestUrl');
      cy.contains('Save').click();
    });

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          author: 'TestAuthor2',
          title: 'TestTitle2',
          url: 'TestUrl2'
        });
      });

      it('the blog can be liked', function () {
        cy.get('#button_show').click();

        cy.contains('Likes: 0');
        cy.get('#button_like').click();
        cy.contains('Likes: 1');
      });

      it('the blog can be removed', function () {
        cy.get('#button_show').click();

        cy.get('#blog').should('exist');
        cy.get('#button_remove').click();
        cy.get('#blog').should('not.exist');
      });
    });
  });
});