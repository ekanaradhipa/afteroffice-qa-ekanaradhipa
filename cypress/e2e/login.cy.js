describe('OrangeHRM admin login', () => {
  it('logs in successfully as an administrator', () => {
    cy.fixture('login').then((credentials) => {
      cy.visit('/web/index.php/auth/login');

      cy.get('input[name="username"]')
        .should('be.visible')
        .type(credentials.username);
      cy.get('input[name="password"]')
        .should('be.visible')
        .type(credentials.password, { log: false });
      cy.get('button[type="submit"]')
        .should('be.enabled')
        .click();

      cy.url().should('include', '/web/index.php/dashboard/index');
      cy.get('h6').should('contain', 'Dashboard');
    });
  });

  it('logs in fails as an administrator', () => {
    cy.fixture('login').then((credentials) => {
      cy.visit('/web/index.php/auth/login');

      cy.get('input[name="username"]')
        .should('be.visible')
        .type("invalid_username");
      cy.get('input[name="password"]')
        .should('be.visible')
        .type("invalid_password", { log: false });
      cy.get('button[type="submit"]')
        .should('be.enabled')
        .click();

      cy.url().should('include', '/web/index.php/auth/login');
     // cy.get('h6').should('contain', 'Invalid credentials');
    });
  });
  
});
