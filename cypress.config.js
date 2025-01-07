const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://staging-commercial-cox-health.firebaseapp.com/core/",
    defaultCommandTimeout: 10000,
    excludeSpecPattern: ["**/1-getting-started", "**/2-advanced-examples"],
    specPattern: ["cypress/e2e/**/*.spec.{js,jsx,ts,tsx}"],
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: false,
    env: {
      userEmail: "krithika.suvarna@codecraft.co.in",
      userPassword: "ean8VCF-ezd7gnb5fen",
      projectId: "0H8EanQ0GefcOYRjV46wL9",
    },
    setupNodeuserPasswordEvents(on, config) {
      require("cypress-plugin-api");
      // implement node event listeners here
    },
  },
});
