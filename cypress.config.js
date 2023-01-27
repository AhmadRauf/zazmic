const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://platform-stage.clouds.health/',
    pageLoadTimeout: 60000,
  },
});
