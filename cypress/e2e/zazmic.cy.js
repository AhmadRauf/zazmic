import selectors from "../support/selectors";

describe('Zazmic Test', () => {
    beforeEach(() => {
        const email = Cypress.env('email');
        const password = Cypress.env('password');
        cy.login(email,password);
        cy.visit('');
    });

    it('Create User', () => {
        // adding user through command
        cy.addUser();
        cy.get(selectors.usersTab).click();
        cy.get(selectors.sortByFirstName).should('be.visible').click();
        // validate user is added
        cy.contains('abcdef@email.com').should('be.visible');
    })

    it('Send Message', () => {
        const filePath = '../../downloads/1.2.276.0.50.192168001092.11517584.14547392.3.dcm';
        cy.get(selectors.messageTab).click();
        cy.get(selectors.uploadButton).click();
        // Selecting file to upload
        cy.get(selectors.fileUploadInput).selectFile(filePath, {force: true});
        cy.intercept('**/statistic/source/graph').as('dropDownList');
        cy.get(selectors.integDropDown).click();
        //waiting for list to load
        cy.wait('@dropDownList').its('response.statusCode').should('eq', 200);
        cy.get(selectors.integOptions).first().click();
        cy.get(selectors.fileUploadModalButton).click();
        // verifying that file is uploaded
        cy.get(selectors.successMessage).should('be.visible');
        cy.get(selectors.closeButton).click();
    })
})