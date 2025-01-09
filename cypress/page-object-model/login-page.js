import { loginPageLocators } from "../utils/selectors/login-page";

export class LoginPage {
  /**
   * Verifies that the login page logo is visible on the page.
   */

  static verifyLoginPage() {
    cy.get(loginPageLocators.loginPageLogo).should("be.visible");
  }
  /**
   * Logs in to the application using the given email and password.
   * @param {string} email - The email to log in with.
   * @param {string} password - The password to log in with.
   */
  static login(email, password) {
    cy.get(loginPageLocators.username).type(email);
    cy.get(loginPageLocators.password).type(password);
    cy.get(loginPageLocators.loginButton).click();
  }

  /**
   * Verifies that the login was successful by checking if the Prosight logo is visible or
   * if the invalid login message is visible, depending on the given email and password.
   * @param {string} email - The email to log in with.
   * @param {string} password - The password to log in with.
   */
  static verifySuccessfulLogin(email, password) {
    if (
      email === Cypress.env("userEmail") &&
      password === Cypress.env("userPassword")
    ) {
      cy.get(loginPageLocators.ProsightLogo)
        .should("be.visible")
        .and("have.attr", "alt", "Logo");
    } else {
      cy.get(loginPageLocators.invalidLogin).should("be.visible");
    }
  }
}
