describe('Test home page', () => {
    it('Visits the app root url', () => {
        cy.visit('/asdasdasd')
        cy.url().should("include",'/home');
    })

    it('test the categories', () => {
        cy.contains('h3', 'All categories')
        cy.get('.display1 p').contains('vegetable')
        cy.get('.display1 p').contains('meat')
        cy.get('.display1 p').contains('bread')
        cy.get('.display1 p').contains('beverage')
    })

    it('test the announcements', () => {
        cy.get('.display1 h4').contains('Rectification Announcement')
        cy.get('.display1 h4').contains('Return Rules Announcement')
        cy.get('.display1 h4').contains('Offer Announcement')
    })

    it('test the hot sale products', () => {
        cy.get('.display2 h4').contains('Hot Sale Products Area')
        cy.get('.hot-sale-product-cards').find('.el-card__body').should('have.length', 24)

    })

    it('test the new products', () => {
        cy.get('.display2 h4').contains('New Items Area')
        cy.get('.new-product-cards').find('.el-card__body').should('have.length', 5)

    })
})

