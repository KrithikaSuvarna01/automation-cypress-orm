import { loginPageLocators } from "../utils/selectors/login";
export class LoginToApp {
  /**
   * Logs into the application using the provided username and password.
   * Navigates to the login page, enters the credentials, and clicks the login button.
   * @param {string} username - The username for login.
   * @param {string} password - The password for login.
   */
  loginToApp(username, password) {
    cy.visit("/");
    cy.get(loginPageLocators.loginText).should("be.visible");
    cy.get(loginPageLocators.username).type(username);
    cy.get(loginPageLocators.password).type(password);
    cy.get(loginPageLocators.loginButton).click();
  }

  /**
   * Verifies that the user is logged in and navigates to the dashboard.
   * @param {string} username - The expected username for login.
   * @param {string} password - The expected password for login.
   */
  verifyLogin = (username, password) => {
    if (username === "Admin" && password === "admin123") {
      cy.url().should("include", "/dashboard/index");
      cy.get(loginPageLocators.dashboardText).should("be.visible");
    } else {
      cy.get(loginPageLocators.alertDiv)
        .children()
        .get(loginPageLocators.invalidCredentialsText)
        .should("be.visible");
      cy.url().should("not.include", "/dashboard/index");
    }
  };
}

export const loginToApp = new LoginToApp();
