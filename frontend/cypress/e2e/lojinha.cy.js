describe('Lojinha', () => {
  it('exibe os três produtos retornados pelo backend real', () => {
    cy.visit('/');
    cy.get('#produtos li').should('have.length', 3).then(($itens) => {
      expect([...$itens].map((item) => item.textContent)).to.deep.equal([
        'Caderno: R$ 19,90',
        'Caneta: R$ 4,50',
        'Mochila: R$ 89,90',
      ]);
    });
  });

  it('informa que os produtos não puderam ser carregados quando a conexão falha', () => {
    cy.intercept('GET', 'http://localhost:3001/produtos', {
      forceNetworkError: true,
    });
    cy.visit('/');
    cy.get('#status').should('have.text', 'Não foi possível carregar os produtos.');
    cy.get('#produtos li').should('have.length', 0);
  });
});
