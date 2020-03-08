import { getGreeting } from '../support/app.po';

describe('app-fedex', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    //cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Register');
  });

  it('should write first name', () => {
    cy.get('input[name="formControlFirstName"]')
      .type('Daniel')
      .should('have.value', 'Daniel');
  });

  it('should write last name', () => {
    cy.get('input[name="formControlLastName"]')
      .type('Danielecki')
      .should('have.value', 'Danielecki');
  });

  it('should write e-mail', () => {
    cy.get('input[name="formControlEmail"]')
      .type('daniel.danielecki@foo.com')
      .should('have.value', 'daniel.danielecki@foo.com');
  });

  it('should write password', () => {
    cy.get('input[name="formControlPassword"]')
      .type('Password')
      .should('have.value', 'Password');
  });

  it('should write password confirmation', () => {
    cy.get('input[name="formControlConfirmPassword"]')
      .type('Password')
      .should('have.value', 'Password');
  });

  it('should fill form and click register button', () => {
    cy.get('input[name="formControlFirstName"]')
      .type('Daniel')
      .should('have.value', 'Daniel');

    cy.get('input[name="formControlLastName"]')
      .type('Danielecki')
      .should('have.value', 'Danielecki');

    cy.get('input[name="formControlEmail"]')
      .type('daniel.danielecki@foo.com')
      .should('have.value', 'daniel.danielecki@foo.com');

    cy.get('input[name="formControlPassword"]')
      .type('Password')
      .should('have.value', 'Password');

    cy.get('input[name="formControlConfirmPassword"]')
      .type('Password')
      .should('have.value', 'Password');

    cy.get('button').click();
  });
});
