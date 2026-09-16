describe('OrangeHRM add cuti', () => {

it('logs in successfully as an administrator and add cuti', () => {
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

    cy.visit('/web/index.php/leave/addLeaveEntitlement');

    cy.get('input[placeholder="Type for hints..."]')
        .should('exist')
        .and('be.visible')
        .type('Bukan Admin');

    cy.contains('.oxd-autocomplete-option', 'Bukan Admin Login')
    .should('be.visible')
    .click();

    cy.get('.oxd-select-text').first().click();
    cy.contains('.oxd-select-option', 'CAN - Bereavement').click();

    cy.get('input[placeholder="Entitlement"]')
        .should('be.visible')
        .clear()
        .type('1');

    cy.get('button[type="submit"]')
        .should('be.enabled')
        .click();
    });
  });

});