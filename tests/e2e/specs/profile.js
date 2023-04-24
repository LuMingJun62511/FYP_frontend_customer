describe('Member Center Page', () => {
    beforeEach(() => {
        cy.visit('/memberCenter');
        cy.get('.profile-container').within(() => {//set user profile in advance
            cy.get('.name-input .el-input__inner').clear().type('fyk');
            cy.get('.phone-input .el-input__inner').clear().type('089123123');
            cy.contains('male').click();
            cy.contains('Modify').click();
        });
    });

    it('should display user profile information', () => {
        cy.contains('h1', 'Member Center');
        cy.get('.profile-container').within(() => {
            cy.get('.name-input .el-input__inner').should('have.value', 'fyk');//'fyk'
            cy.get('.phone-input .el-input__inner').should('have.value', '089123123');//'089123123'
            cy.contains('male').should('have.attr', 'checked');
        });
    });

    it('should allow user to modify profile information', () => {
        cy.get('.profile-container').within(() => {
            cy.get('.name-input .el-input__inner').clear().type('Jane');
            cy.get('.phone-input .el-input__inner').clear().type('0987654321');
            cy.contains('female').click();
            cy.contains('Modify').click();
        });
        cy.get('.profile-container').within(() => {
            cy.get('.name-input .el-input__inner').should('have.value', 'Jane');//'fyk'
            cy.get('.phone-input .el-input__inner').should('have.value', '0987654321');//'089123123'
        });
    });

    it('should display user statistics', () => {
        cy.get('.statistic-container').within(() => {
            cy.contains('Total consumption:').next().should('have.text', '714');
            cy.contains('Total order count:').next().should('have.text', '23');
            cy.contains('Loyal points:').next().should('have.text', '500');
        });
    });

});
