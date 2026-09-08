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

      cy.visit('/web/index.php/admin/viewSystemUsers');
    //  cy.contains('h6', 'System Users').should('be.visible');
      cy.contains('button', 'Add').click();

      cy.url().should('include', '/web/index.php/admin/saveSystemUser');
      cy.get('label').contains('User Role').parent().next().find('.oxd-select-text').click();
      cy.contains('.oxd-select-option', 'ESS').click();

      cy.get('label').contains('Employee Name').parent().next().find('input').type('a');
      cy.get('.oxd-autocomplete-option').first().click();

      cy.get('label').contains('Status').parent().next().find('.oxd-select-text').click();
      cy.contains('.oxd-select-option', 'Enabled').click();

      cy.get('label').contains('Username').parent().next().find('input').type('employee.test');
      cy.get('label').contains('Password').parent().next().find('input').type('Employee@Test123', { log: false });
      cy.get('label').contains('Confirm Password').parent().next().find('input').type('Employee@Test123', { log: false });

      cy.contains('button', 'Save').click();
      cy.contains('.oxd-toast', 'Successfully Saved').should('be.visible');

    });
  });
});
