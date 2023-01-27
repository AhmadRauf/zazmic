
describe('Task', () => {
  // UI Task
  it('UI', () => {
    cy.visit('/');
    //Logging In
    cy.fixture('example').then((regdata) => {
      cy.login(regdata.email,regdata.password);
    });
    const filePath = 'cypress\\downloads\\1.2.276.0.50.192168001092.11517584.14547392.3.dcm';
    //Going to Messages
    cy.get('[href="/messages"]').click();
    cy.get('button').contains('Upload file').click();
    // Selecting file to upload
    cy.get('input[type=file]').selectFile(filePath, {force: true});
    cy.intercept('**/statistic/source/graph').as('dropDownList');
    cy.get('div').contains('Enter Integration name').click();
    //waiting for list to load
    cy.wait('@dropDownList').its('response.statusCode').should('eq', 200);
    cy.get('.select-option-label', {timeout: 60000}).first().click();
    cy.get('app-upload-file-modal').find('button').contains('Upload file ').click();
    // verifying that file is uploaded
    cy.get('div').contains('File was uploaded').should('be.visible');
    cy.get('button').contains('Close ').click();
  });

  it('API', () => {
    cy.visit('/');
    //1. Logging In
    cy.fixture('example').then((regdata) => {
      cy.login(regdata.email,regdata.password);
    });
    //2. Extracting token from API
    cy.intercept('**/v1/auth/token').as('loginToken');
    cy.wait('@loginToken').then(res => {
      // Setting up the token
      const authorization = `Bearer ${ res.response.body.value }`;
      // Setting up the request
      const options = {
        method: 'POST',
        url: 'https://backend-stage.clouds.health/v1/profile/create',
        headers: {
          authorization,
        },
        body: {
            "profileData": {
                "firstName": "ABC",
                "lastName": "MNP",
                "user": "abcMnp@email.com",
                "timeZone": {
                    "zoneName": "Pacific Time",
                    "name": "Pacific Time",
                    "utcOffset": -8,
                    "dst": "N"
                },
                "role": "USER",
                "phone": {
                    "countryCode": "+1",
                    "areaCode": "206",
                    "number": "1111111111"
                },
                "activityStatus": "INVITED",
                "facilityGroup": "cloudhealth-stg"
            }
        }
      }
      // Sending the request and verifying
      cy.request(options).its('status').should('eq', 200);
    });
    // verifying user is created
    cy.get('[href="/users"]').click();
    cy.get('app-table-header-cell[sortkey=firstName]').should('be.visible').click();
    cy.contains('abcMnp@email.com', {timeout: 30000}).should('be.visible');
  })
})


