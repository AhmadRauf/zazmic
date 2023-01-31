Cypress.Commands.add('login', (email, password) => {
    cy.session(
        [email, password],
        () => {
            cy.clearAllSessionStorage();
            cy.visit('')
            cy.get('[data-cy=email]').type(email);
            cy.get('[data-cy=password]').type(password);
            cy.get('[type=submit]').click();
        },
        {
            validate() {
                cy.intercept('**/auth/token').as('authToken')
                cy.wait('@authToken').then((res) => {
                    window.localStorage.setItem('token', `Bearer ${ res.response.body.value }`);
                })
            }
        }
    )
})

Cypress.Commands.add('addUser', () => {
    const apiUrl = Cypress.env('apiUrl')
    const auth = window.localStorage.getItem('token');
    cy.request({
        url: `${apiUrl}/profile/create`,
        method: 'POST',
        headers: {
            'Authorization': auth,
        },
        body: {
            "profileData": {
                "firstName": "AAAA",
                "lastName": "BBBB",
                "user": "abcdef@email.com",
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
    })
    .its('status').should('eq', 200);
})