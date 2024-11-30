import { adminPageLocators } from "../utils/selectors/admin";
import { commonPageLocator } from "../utils/selectors/common-page";
class AdminPage {
  /**
   * Creates a new user with the given userData.
   * @param {Object} userData - an object containing the user data
   * @param {string} userData.role - the role of the user
   * @param {string} userData.employeeName - the employee name of the user
   * @param {string} userData.status - the status of the user
   * @param {string} userData.username - the username of the user
   * @param {string} userData.password - the password of the user
   */

  createUser(userData) {
    cy.get(commonPageLocator.addButton).click();
    cy.get(adminPageLocators.addUserTitle).should("be.visible");

    cy.get(adminPageLocators.userRoleLabel)
      .parent()
      .parent()
      .find(adminPageLocators.textFieldClass)
      .click();
    cy.get(adminPageLocators.userRoleOption).contains(userData.role).click();

    cy.get(adminPageLocators.employeeNameLabel)
      .parent()
      .parent()
      .find(commonPageLocator.input)
      .type(userData.employeeName);
    cy.wait(500);
    cy.get(adminPageLocators.autoCompleteTextField)
      .should("be.visible")
      .find(commonPageLocator.listBox)
      .children()
      .eq(2)
      .click();

    cy.get(adminPageLocators.statusLable)
      .parent()
      .parent()
      .find(adminPageLocators.statusInput)
      .click();
    cy.get(adminPageLocators.statusOption).contains(userData.status).click();

    cy.get(adminPageLocators.usernameInput)
      .parent()
      .parent()
      .find(commonPageLocator.input)
      .type(userData.username);
    cy.contains("label", adminPageLocators.passwordInput)
      .parent()
      .parent()
      .find(commonPageLocator.input)
      .type(userData.password);
    cy.contains("label", adminPageLocators.confirmPasswordInput)
      .parent()
      .parent()
      .find(commonPageLocator.input)
      .type(userData.password);

    cy.get(commonPageLocator.saveButton).click();
    cy.wait(5000);
    cy.get(adminPageLocators.systemUsersHeader).should("be.visible");
  }

  /**
   * Verifies that the user with the given username exists and deletes it.
   * @param {string} username - the username of the user to verify and delete
   */
  verifyUserAndDelete(username) {
    cy.get(adminPageLocators.usernameInput)
      .parent()
      .parent()
      .find(commonPageLocator.input)
      .type(username);
    cy.get(commonPageLocator.searchButton).click();

    cy.get(adminPageLocators.orangeHrmContainer)
      .children()
      .should("contain", username);
    cy.get(adminPageLocators.userTableRow)
      .first()
      .find(commonPageLocator.checkBox)
      .check({ force: true });

    cy.get(adminPageLocators.deleteSelectedButton).click({ force: true });
    cy.get(adminPageLocators.deleteConfirmationMessage).should("be.visible");
    cy.get(adminPageLocators.deleteConfirmationButton).click({
      force: true,
    });

    cy.get(adminPageLocators.orangeHrmContainer)
      .children()
      .should("not.contain", username);
  }

  /**
   * Navigates to the Job Titles page in the Admin module.
   */
  navigateToJobTitles() {
    cy.get(adminPageLocators.jobTab).click();
    cy.get(adminPageLocators.jobTitlesLink).click();
  }

  /**
   * Adds a new job title using the provided job data.
   * @param {Object} jobData - An object containing details of the job to be added.
   * @param {string} jobData.jobTitle - The title of the job.
   * @param {string} jobData.jobDescription - The description of the job.
   * @param {string} jobData.note - Additional notes for the job.
   * @param {string} jobData.specificationFile - The filename of the job specification document.
   */
  addJob(jobData) {
    cy.get(commonPageLocator.addButton).click();
    cy.get(adminPageLocators.addJobTitle).should("be.visible");

    cy.get(adminPageLocators.jobTitleInput)
      .parent()
      .parent()
      .find(commonPageLocator.input)
      .type(jobData.jobTitle);

    cy.get(adminPageLocators.jobDescriptionTextarea)
      .parent()
      .parent()
      .find(commonPageLocator.textArea)
      .type(jobData.jobDescription);

    cy.get(adminPageLocators.jobNoteTextarea)
      .parent()
      .parent()
      .find(commonPageLocator.textArea)
      .type(jobData.note);

    cy.get(adminPageLocators.jobSpecificationLable)
      .parent()
      .parent()
      .find(adminPageLocators.jobSpecificationInput)
      .selectFile(`cypress/fixtures/${jobData.specificationFile}`, {
        force: true,
      });

    cy.get(commonPageLocator.saveButton).click();
  }

  /**
   * Verifies that a job title exists in the job titles table and then deletes it.
   * @param {string} jobTitle - The title of the job to verify and delete.
   */
  verifyJobExistsAndDelete(jobTitle) {
    cy.wait(10000);

    cy.contains(adminPageLocators.tableRow, jobTitle)
      .should("exist")
      .within(() => {
        cy.get(commonPageLocator.checkBox)
          .should("exist")
          .check({ force: true });
      });

    cy.get(adminPageLocators.deleteSelectedButton).click({ force: true });

    cy.get(adminPageLocators.deleteConfirmationMessage).should("be.visible");
    cy.get(adminPageLocators.deleteConfirmationButton).click({
      force: true,
    });

    cy.contains(commonPageLocator.tableRow, jobTitle).should("not.exist");
  }
}

export const adminPage = new AdminPage();
