export class ApiLogin {
  loginResponse = null;
  /**
   * Perform a POST request to the Reqres login API with
   * invalid credentials and store the response for later use.
   * @returns {Cypress.Chainable<null>}
   */
  apiLogin() {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/login",
      failOnStatusCode: false,
      body: {
        email: "eve.holt@reqres.in",
        password: "wrongpassword",
      },
    }).then(({ body }) => {
      cy.log(body, JSON.stringify(body, null, 2));
      this.loginResponse = body;
    });
  }
  getToken() {
    // Access the stored response
    return this.loginResponse?.token;
  }
}

export const apiLogin = new ApiLogin();
