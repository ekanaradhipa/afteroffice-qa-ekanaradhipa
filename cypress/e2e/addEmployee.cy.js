describe('OrangeHRM employee management', () => {
  it('creates a new employee user', () => {
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

      cy.visit('/web/index.php/pim/addEmployee');

      cy.get('input[name="firstName"]')
        .should('exist')
        .and('be.visible')
        .type('firstName');

      cy.get('input[name="middleName"]')
        .should('exist')
        .and('be.visible')
        .type('middleName');

      cy.get('input[name="lastName"]')
        .should('exist')
        .and('be.visible')
        .type('lastName');

      cy.get('button[type="submit"]')
        .should('be.enabled')
        .click();

      cy.contains('h6', 'Personal Details', { timeout: 15000 })
        .should('be.visible');

      cy.url().should('include', '/web/index.php/pim/viewPersonalDetails/empNumber/');

    
    });
  });

  it('creates a new employee user failed', () => {
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

      cy.visit('/web/index.php/pim/addEmployee');


      cy.get('button[type="submit"]')
        .should('be.enabled')
        .click();

  
      cy.url().should('not.contain', '/web/index.php/pim/viewPersonalDetails/empNumber/');

    });
  });
});
