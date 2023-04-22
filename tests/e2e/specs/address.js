describe('Member Center Page', () => {
    beforeEach(() => {
        cy.visit('/memberCenter');
    });

    it('should display user profile information', () => {
        cy.contains('h2', 'Member Center');
        cy.get('.profile-container').within(() => {
            cy.get('input[placeholder="User Name"]').should('have.value', 'fyk');
            cy.get('input[placeholder="Phone Number"]').should('have.value', '089123123');
            cy.contains('male').should('be.checked');
            // cy.get('textarea[placeholder="Personalized Signature"]').should('have.value', 'Hello, World!');
        });
    });

    it('should allow user to modify profile information', () => {
        cy.get('.profile-container').within(() => {
            cy.get('input[placeholder="User Name"]').clear().type('Jane');
            cy.get('input[placeholder="Phone Number"]').clear().type('0987654321');
            cy.contains('female').click();
            cy.get('textarea[placeholder="Personalized Signature"]').clear().type('Nice to meet you!');
            cy.contains('Modify').click();
        });
        cy.wait(1000); // wait for API response
        cy.get('.profile-container').within(() => {
            cy.get('input[placeholder="User Name"]').should('have.value', 'Jane');
            cy.get('input[placeholder="Phone Number"]').should('have.value', '0987654321');
            cy.contains('female').should('be.checked');
            cy.get('textarea[placeholder="Personalized Signature"]').should('have.value', 'Nice to meet you!');
        });
    });

    it('should display user statistics', () => {
        cy.get('.statistic-container').within(() => {
            cy.contains('Total Consumption').next().should('have.text', '1000');
            cy.contains('Total Orders').next().should('have.text', '10');
            cy.contains('Loyal Points').next().should('have.text', '50');
        });
    });

    it('should allow user to manage addresses', () => {
        cy.get('.addresses-container').within(() => {
            cy.contains('Address Manage').click();
        });
        cy.url().should('include', '/address-manage');
    });
});
