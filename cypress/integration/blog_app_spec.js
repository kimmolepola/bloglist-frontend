describe('Blog app', function() {

    const name = 'Pelaaja';
    const username = 'pelaaja';
    const password = '123salasana';

    const name2 = 'Pelaaja2';
    const username2 = 'pelaaja2';
    const password2 = '123salasana2';

    const blogtitle = 'Test Blog Title';
    const blogauthor = 'Test Author';
    const blogurl = 'www.testblogurl.com';

    const reset = () => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        const user = {
            name,
            username,
            password,
        }
        const user2 = {
            name: name2,
            username: username2,
            password: password2,
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user);
        cy.request('POST', 'http://localhost:3003/api/users/', user2);
        cy.visit('http://localhost:3000');        
    };


    describe('Login', function() {
        before(function() {
            reset();
        });

        describe('logging in and out', function() {
            it('logging in can be done', function() {
            cy.get('[data-cy=login-username]').type(username);
            cy.get('[data-cy=login-password]').type(password);
            cy.get('[data-cy=login-submit]').click();
            cy.contains(`${name} logged in`);
        });
            it('logging out can be done', function() {
                cy.get('[data-cy=logout-button]').click();
                cy.get('[data-cy=login-submit]');
            })        
        })
    })

    describe('Blog', function() {
        before(function() {
            reset();
        });
        describe('blog creation and deletion', function() {
            it('blog can be created', function() {
                cy.get('[data-cy=login-username]').type(username);
                cy.get('[data-cy=login-password]').type(password);
                cy.get('[data-cy=login-submit]').click();
                cy.get('[data-cy=create-new-blog-button]').click();
                cy.get('[datacy=create-new-blog-title-input]').type(blogtitle);
                cy.get('[datacy=create-new-blog-author-input]').type(blogauthor);
                cy.get('[datacy=create-new-blog-url-input]').type(blogurl);
                cy.get('[data-cy=create-new-blog-submit]').click();
                cy.contains(`${blogtitle} ${blogauthor}`);
            });
            it('blog can not be deleted by user who did not submit the blog', function() {
                cy.get('[data-cy=logout-button]').click();
                cy.get('[data-cy=login-submit]');
                cy.get('[data-cy=login-username]').type(username2);
                cy.get('[data-cy=login-password]').type(password2);
                cy.get('[data-cy=login-submit]').click();
                cy.contains(`${blogtitle} ${blogauthor}`).click();
                cy.get('[data-cy=blog-like-button]');
                cy.get('[data-cy=blog-add-comment-button]');
                cy.get('[data-cy=blog-remove-button]').should('not.visible');
            });
            it('blog can be deleted by user who submitted the blog', function() {
                cy.get('[data-cy=logout-button]').click();
                cy.get('[data-cy=login-submit]');
                cy.get('[data-cy=login-username]').type(username);
                cy.get('[data-cy=login-password]').type(password);
                cy.get('[data-cy=login-submit]').click();
                cy.contains(`${blogtitle} ${blogauthor}`).click();
                cy.get('[data-cy=blog-remove-button]').should('visible');
                cy.get('[data-cy=blog-remove-button]').click();
                cy.get('[data-cy=create-new-blog-button]');
                cy.contains(`${blogtitle} ${blogauthor}`).should('not.exist');
            })
        });
    });
});