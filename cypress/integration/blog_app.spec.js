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

    describe('and multiple blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          author: 'TestAuthor1',
          title: 'TestTitle1',
          url: 'TestUrl1'
        });

        cy.createBlog({
          author: 'TestAuthor2',
          title: 'TestTitle2',
          url: 'TestUrl2'
        });

        cy.createBlog({
          author: 'TestAuthor3',
          title: 'TestTitle3',
          url: 'TestUrl3'
        });

        cy.contains('TestTitle1').as('Blog1');
        cy.get('@Blog1').contains('Show').click();
        cy.get('@Blog1').contains('Like').as('Like1');

        cy.contains('TestTitle2').as('Blog2');
        cy.get('@Blog2').contains('Show').click();
        cy.get('@Blog2').contains('Like').as('Like2');

        cy.contains('TestTitle3').as('Blog3');
        cy.get('@Blog3').contains('Show').click();
        cy.get('@Blog3').contains('Like').as('Like3');
      });

      it('the blogs are ordered according to likes', function () {
        // Like blogs [1,2,3] [2,1,0] times
        cy.get('@Like2').click();
        cy.wait(400);
        cy.get('@Like2').click();
        cy.wait(400);

        cy.get('@Like3').click();
        cy.wait(400);

        cy.get('.blogShown').then(blogs => {
          cy.wrap(blogs[0]).contains('Likes: 2');
          cy.wrap(blogs[1]).contains('Likes: 1');
          cy.wrap(blogs[2]).contains('Likes: 0');
        });
      });
    });
  });
});