import { loginToApp } from "../page-object-model/login-page";
import { navigateTo } from "../page-object-model/navigate-to";
import { recruitmentPage } from "../page-object-model/recruitment-page";
import credentials from "../fixtures/login-credentials.json";
import candidate from "../fixtures/candidate.json";
import vacancyData from "../fixtures/vacancy.json";
import { adminPage } from "../page-object-model/admin-page";
import userData from "../fixtures/users.json";
import jobData from "../fixtures/job-data.json";

describe("Admin and Recruitment Workflow", () => {
  beforeEach("Before all the test cases login to app", () => {
    const { username, password } = credentials[0];
    loginToApp.loginToApp(username, password);
    loginToApp.verifyLogin(username, password);
  });

  it("Create a Candidate and verify his profile", () => {
    navigateTo.navigateTo("Recruitment");
    recruitmentPage.addCandidate(candidate);
    recruitmentPage.verifyCandidate(candidate);
  });

  it.only("Create a vacancy", () => {
    navigateTo.navigateTo("Recruitment");
    recruitmentPage.addVacancy(vacancyData);
  });
  it("Create a User, Assert the user creation and deletion", () => {
    navigateTo.navigateTo("Admin");
    adminPage.createUser(userData);
    adminPage.verifyUserAndDelete(userData.username);
  });

  it("Create a Job, Assert its existence, and Delete it", () => {
    navigateTo.navigateTo("Admin");
    adminPage.navigateToJobTitles();

    adminPage.addJob(jobData);
    adminPage.verifyJobExistsAndDelete(jobData.jobTitle);
  });
});
