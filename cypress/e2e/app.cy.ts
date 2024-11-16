describe('My Angular App', () => {
  beforeEach(() => {
    cy.visit('/');
    // cy.visit('https://google.pl');
  });

  it('should display welcome message', () => {
    cy.contains('Hello');
  });

  it('should increment counter on button click', () => {
    // cy.contains('Click me: 0');
    // cy.contains('button', 'Click me').click();
    // cy.contains('Click me: 1');
  });
});