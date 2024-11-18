describe('My Angular App', () => {

  it('Reset API', () => {
    cy.request('http://localhost:3000/reset');
  });

  it('should display welcome message', () => {
    cy.visit('/');
    cy.contains('Choose the type of the game:');
  });

  it('should start the game by clicking the start button', () => {
    cy.get('[data-testid="game-setup__start-btn"]')
      .should('be.visible')
      .click();
  });

  it('should display play and button and initial players state', () => {
    cy.get('[data-testid="game__play-btn"]')
      .should('be.visible');

    cy.get('[data-testid="game__end-btn"]')
      .should('be.visible')

    cy.get('[data-testid="player__score"]').eq(0).should('have.text', 'Score: 0');
    cy.get('[data-testid="player__score"]').eq(1).should('have.text', 'Score: 0');
  });

  it('player 1 should win first round', () => {
    cy.get('[data-testid="game__play-btn"]').click();

    cy.wait(10);
    cy.get('[data-testid="player__score"]').eq(0).should('have.text', 'Score: 1');
    cy.get('[data-testid="player__score"]').eq(1).should('have.text', 'Score: 0');
  });

  it('player 1 should win second round', () => {
    cy.get('[data-testid="game__play-btn"]').click();

    cy.wait(10);
    cy.get('[data-testid="player__score"]').eq(0).should('have.text', 'Score: 2');
    cy.get('[data-testid="player__score"]').eq(1).should('have.text', 'Score: 0');
  });

  it('player 2 should win third round', () => {
    cy.get('[data-testid="game__play-btn"]').click();

    cy.wait(10);
    cy.get('[data-testid="player__score"]').eq(0).should('have.text', 'Score: 2');
    cy.get('[data-testid="player__score"]').eq(1).should('have.text', 'Score: 1');
  });

  it('last round should be skipped becuase one person mass is unknown', () => {
    cy.get('[data-testid="game__play-btn"]').click();

    cy.wait(10);
    cy.get('[data-testid="player__score"]').eq(0).should('have.text', 'Score: 2');
    cy.get('[data-testid="player__score"]').eq(1).should('have.text', 'Score: 1');
    cy.get('.mat-mdc-snack-bar-label').should('contain', "One item's mass is unknown, round skipped");
  });

  it('should end the game after end button clicked and show results', () => {
    cy.get('[data-testid="game__end-btn"]').click();

    cy.contains('Game over');
    cy.contains('Player 1 wins')
  });

  it('should restart game after restart button clicked', () => {
    cy.get('[data-testid="game-results__restart-btn"]').click();
    cy.contains('Choose the type of the game:');
    cy.get('[data-testid="game-setup__starships-radio"]').click();
    cy.get('[data-testid="game-setup__start-btn"]').click();
  });

  it('game should be in initial state after restart', () => {
    cy.get('[data-testid="player__score"]').eq(0).should('have.text', 'Score: 0');
    cy.get('[data-testid="player__score"]').eq(1).should('have.text', 'Score: 0');
  });

  it('player 1 should win two rounds of starships', () => {
    cy.get('[data-testid="game__play-btn"]').click();

    cy.wait(10);

    cy.get('[data-testid="game__play-btn"]').click();

    cy.wait(10);

    cy.get('[data-testid="player__score"]').eq(0).should('have.text', 'Score: 2');
    cy.get('[data-testid="player__score"]').eq(1).should('have.text', 'Score: 0');
  });
});