describe('Test Orders Table', () => {
    beforeEach(() => {
        cy.visit('/myOrders');
    });

    it('should display the table correctly', () => {
        cy.get('.el-table')
            .should('be.visible')
            .and('have.length', 1);

        cy.get('.el-table__header')
            .should('be.visible')
            .and('have.length', 1);

        cy.get('.el-table__header th')
            .should('have.length', 5);

        cy.get('.el-table__body tr')
            .should('have.length', 13);
    });

    it('should expand the rows correctly', () => {
        cy.get('.el-table__body tr:first-child td:first-child ').click();
    });

    it('should be able to check receipt', () => {
        cy.get('.el-table__body tr:first-child td:last-child button')
            .should('be.visible')
            .and('contain', 'check receipt')
            .click();

        cy.url().should('contain', '/receipt');
    });
});
