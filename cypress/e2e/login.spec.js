import credentials from "../fixtures/login-credentials.json";
import { loginToApp } from "../support/login-page";

describe("Login Flow Tests", () => {
  const testCases = [
    {
      scenario: "valid credentials",
      credentials: credentials.valid,
      isValid: true,
    },
    {
      scenario: "invalid credentials",
      credentials: credentials.invalid,
      isValid: false,
    },
  ];

  testCases.forEach(({ scenario, credentials, isValid }) => {
    it(`should ${
      isValid ? "successfully" : "fail to"
    } login with ${scenario}`, () => {
      const { username, password } = credentials;
      loginToApp.loginToApp(username, password);
      loginToApp.verifyLogin(isValid);
    });
  });
});
