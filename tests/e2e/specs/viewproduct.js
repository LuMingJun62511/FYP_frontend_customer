describe('Test view products related', () => {
    it('Visits the app root url', () => {
        cy.visit('/memberCenter')
        cy.contains('h1', 'Welcome to Your Vue.js App')
    })

})
