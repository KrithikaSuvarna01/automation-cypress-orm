import { apiLogin } from "../support/api-login";

describe("API Login Tests", () => {
  it("Should retrieve and validate the token", () => {
    apiLogin.apiLogin();
    cy.then(() => {
      const token = apiLogin.getToken();
      expect(token).to.exist;
      cy.log("Stored Token:", token);
    });
  });
});
