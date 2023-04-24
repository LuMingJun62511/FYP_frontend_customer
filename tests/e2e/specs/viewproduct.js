describe('Test view products related', () => {
    it('Search for items with name similar to inputed', () => {
        cy.visit('/home')
        cy.get('.search-bar-input').type('egg')
        cy.get('.search-bar-button').click()
        cy.get('.searched-products-container').find('.el-card__body').should('have.length', 5)

        cy.get('.search-bar-input').type('pep')
        cy.get('.search-bar-button').click()
        cy.get('.searched-products-container').find('.el-card__body').should('have.length', 9)
    })
})
