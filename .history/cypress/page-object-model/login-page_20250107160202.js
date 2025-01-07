import { loginPageLocators } from "../utils/selectors/login-page";

export class LoginPage {
  verifyLoginPage() {
    cy.get(loginPageLocators.loginPageLogo).should("be.visible");
  }
  login(email, password) {
    cy.get(loginPageLocators.username).type(email);
    cy.get(loginPageLocators.password).type(password);
    cy.get(loginPageLocators.loginButton).click();
  }

  verifySuccessfulLogin(email, password) {
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

export const loginPage = new LoginPage();
