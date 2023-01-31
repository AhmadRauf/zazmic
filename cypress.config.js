const {defineConfig} = require("cypress");

module.exports = defineConfig({
    env: {
        apiUrl: 'https://backend-stage.clouds.health/v1',
        email: 'galyna.alieksandrova+5@zazmic.com',
        password: 'TestAcc123!'
    },
    e2e: {
        defaultCommandTimeout: 30000,
        requestTimeout: 30000,
        baseUrl: 'https://platform-stage.clouds.health/'
    }
});
