const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com/web/index.php",
    excludeSpecPattern: ["**/1-getting-started", "**/2-advanced-examples"],
    specPattern: ["cypress/e2e/**/*.spec.{js,jsx,ts,tsx}"],
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: false,
    env: {
      apiUrl: "https://fakestoreapi.com/users",
      userPassword: "Admin",
      userPassword: "admin@113",
    },
    setupNodeuserPasswordEvents(on, config) {
      // implement node event listeners here
    },
  },
});
