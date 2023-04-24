describe('Test checkout', () => {
    it('Visits the app root url', () => {
        cy.visit('/home')
        cy.get('.search-bar-input').type('pepsi')
        cy.get('.search-bar-button').click()
        cy.get('button').contains('add to the cart').first().click()
    })

    it('start to checkout, test go back to shop', () => {
        cy.visit('/checkout')
        cy.get('button').contains('continue shopping').first().click()
        cy.url().should("include",'/home');
    })

})

