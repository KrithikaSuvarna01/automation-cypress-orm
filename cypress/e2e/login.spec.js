import credentials from "../fixtures/login-credentials.json";
import { loginToApp } from "../page-object-model/login-page";

describe("Login Flow Tests", () => {
  credentials.forEach(({ username, password }) => {
    it(`should ${
      username === "Admin" && password === "admin123"
        ? "successfully"
        : "fail to"
    } login`, () => {
      loginToApp.loginToApp(username, password);
      loginToApp.verifyLogin(username, password);
    });
  });
});
