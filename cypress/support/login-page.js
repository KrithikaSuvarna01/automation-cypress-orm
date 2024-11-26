export class LoginToApp {
  loginToApp(username, password) {
    cy.visit("/");
    cy.contains("h5", "Login").should("be.visible");
    cy.get("[placeholder='Username']").type(username);
    cy.get("[placeholder='Password']").type(password);
    cy.contains("button", "Login").click();
  }

  verifyLogin = (isValid) => {
    if (isValid) {
      cy.url().should("include", "/dashboard/index");
      cy.contains("h6", "Dashboard").should("be.visible");
    } else {
      cy.get('[role="alert"]')
        .children()
        .contains("p", "Invalid credentials")
        .should("be.visible");
      cy.url().should("not.include", "/dashboard/index");
    }
  };
}

export const loginToApp = new LoginToApp();
