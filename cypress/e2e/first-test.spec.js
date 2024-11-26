import { loginToApp } from "../support/login-page";
import { navigateTo } from "../support/navigate-to";
import { recruitmentPage } from "../support/recruitment-page";
import credentials from "../fixtures/login-credentials.json";
import candidate from "../fixtures/candidate.json";
import vacancyData from "../fixtures/vacancy.json";
import { adminPage } from "../support/admin-page";
import userData from "../fixtures/users.json";
import jobData from "../fixtures/job-data.json";

describe("Admin and Recruitment Workflow", () => {
  beforeEach("Before all the test cases login to app", () => {
    const { username, password } = credentials.valid;
    loginToApp.loginToApp(username, password);
    cy.contains("h6", "Dashboard").should("be.visible");
  });

  it("Create a Candidate and verify his profile", () => {
    navigateTo.navigateTo("Recruitment");
    recruitmentPage.addCandidate(candidate);
    recruitmentPage.verifyCandidate(candidate);
  });

  it("Create a vacancy", () => {
    navigateTo.navigateTo("Recruitment");
    recruitmentPage.addVacancy(vacancyData);
  });
  it("Create a User, Assert the user creation and deletion", () => {
    navigateTo.navigateTo("Admin");
    adminPage.createUser(userData);
    adminPage.verifyUserAndDelete(userData.username);
  });

  it.only("Create a Job, Assert its existence, and Delete it", () => {
    navigateTo.navigateTo("Admin");
    adminPage.navigateToJobTitles();

    adminPage.addJob(jobData);
    adminPage.verifyJobExistsAndDelete(jobData.jobTitle);
  });
});
