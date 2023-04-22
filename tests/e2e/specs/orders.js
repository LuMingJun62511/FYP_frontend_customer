describe('Test order part related', () => {
    it('Visits the app root url', () => {
        cy.visit('/memberCenter')
        cy.contains('h1', 'Welcome to Your Vue.js App')
    })


})
