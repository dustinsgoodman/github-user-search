describe('app homepage loads', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render the home page and display a message', () => {
    cy.get('h1').contains('Welcome');
  });
});

export {};
