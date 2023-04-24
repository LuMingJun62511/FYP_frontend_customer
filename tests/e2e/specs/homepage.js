describe('Test home page', () => {
    it('Visits the app root url', () => {
        cy.visit('/home')
        cy.contains('h3', 'All categories')
    })


})
