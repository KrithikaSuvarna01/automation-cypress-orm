import { commonPageLocator } from "../utils/selectors/common-page";
import { recruitmentPageLocators } from "../utils/selectors/recruitment";
class RecruitmentPage {
  /**
   * Navigates to the Recruitment page by clicking on the Recruitment tab.
   */
  navigateToRecruitment() {
    cy.get(recruitmentPageLocators.recruitmentTab).click();
  }

  addCandidate(candidate) {
    /*************  ✨ Codeium Command ⭐  *************/
    /**
     * Adds a new candidate using the provided candidate details.
     * @param {Object} candidate - An object containing details of the candidate to be added.
     * @param {string} candidate.firstName - The first name of the candidate.
     * @param {string} candidate.middleName - The middle name of the candidate.
     * @param {string} candidate.lastName - The last name of the candidate.
     * @param {string} candidate.email - The email address of the candidate.
     * @param {string} candidate.contactNumber - The contact number of the candidate.
     * @param {string} candidate.resume - The filename of the candidate's resume.
     * @param {string} candidate.keywords - The keywords associated with the candidate.
     * @param {string} candidate.notes - Additional notes about the candidate.
     */
    /******  46fd51af-76a3-4cb4-884e-362de84f6f40  *******/ cy.get(
      commonPageLocator.addButton
    ).click();
    cy.get(recruitmentPageLocators.firstNameInput).type(candidate.firstName);
    cy.get(recruitmentPageLocators.middleNameInput).type(candidate.middleName);
    cy.get(recruitmentPageLocators.lastNameInput).type(candidate.lastName);
    cy.get(recruitmentPageLocators.jobTitleDropdown).click();
    cy.get(recruitmentPageLocators.jobTitleOption)
      .find(recruitmentPageLocators.roleOption)
      .eq(1)
      .click();
    cy.get(recruitmentPageLocators.emailInput)
      .parent()
      .parent()
      .find(commonPageLocator.input)
      .type(candidate.email);
    cy.get(recruitmentPageLocators.contactNumberInput)
      .parent()
      .parent()
      .find(commonPageLocator.input)
      .type(candidate.contactNumber);
    cy.get(commonPageLocator.fileInput).selectFile(
      `cypress/fixtures/${candidate.resume}`,
      {
        force: true,
      }
    );
    cy.get(recruitmentPageLocators.keywordsInput)
      .parent()
      .parent()
      .find(commonPageLocator.input)
      .type(candidate.keywords);
    cy.get(recruitmentPageLocators.notesTextarea)
      .parent()
      .parent()
      .find(commonPageLocator.textArea)
      .type(candidate.notes);
    cy.get(commonPageLocator.checkBox).check({ force: true });
    cy.get(commonPageLocator.saveButton).click();
  }

  /**
   * Verifies that the candidate's full name is visible on the page.
   * @param {Object} candidate - An object containing details of the candidate to be verified.
   * @param {string} candidate.firstName - The first name of the candidate.
   * @param {string} candidate.middleName - The middle name of the candidate.
   * @param {string} candidate.lastName - The last name of the candidate.
   */
  verifyCandidate(candidate) {
    cy.contains(
      "p",
      `${candidate.firstName} ${candidate.middleName} ${candidate.lastName}`
    ).should("be.visible");
  }

  /**
   * Adds a new vacancy using the provided vacancy details.
   * @param {Object} vacancyDetails - An object containing details of the vacancy to be added.
   * @param {string} vacancyDetails.vacancyName - The name of the vacancy.
   * @param {string} [vacancyDetails.description] - The description of the vacancy.
   * @param {string} [vacancyDetails.hiringManager] - The hiring manager of the vacancy.
   * @param {number} [vacancyDetails.numberOfPositions] - The number of positions available for the vacancy.
   */
  addVacancy(vacancyDetails) {
    cy.get(recruitmentPageLocators.vacanciesTab).click();
    cy.get(commonPageLocator.addButton).click();
    cy.get(recruitmentPageLocators.addVacancyText).should("be.visible");

    cy.get(recruitmentPageLocators.vacancyNameInput)
      .parent()
      .parent()
      .find(commonPageLocator.input)
      .type(vacancyDetails.vacancyName);

    cy.get(recruitmentPageLocators.jobTitleLabel)
      .parent()
      .parent()
      .find(recruitmentPageLocators.jobTitleDropdownWrapper)
      .click();

    // Select the first option in the Job Title dropdown
    cy.get(recruitmentPageLocators.jobTitleDropdownInput)
      .should("be.visible")
      .then(() => {
        cy.get(recruitmentPageLocators.jobTitleDropdownWrapper)
          .find(commonPageLocator.listBox)
          .children()
          .eq(1)
          .click();
      });

    cy.get(recruitmentPageLocators.descriptionTextarea)
      .parent()
      .parent()
      .find(commonPageLocator.textArea)
      .type(vacancyDetails.description);

    cy.get(recruitmentPageLocators.hiringManagerInput)
      .parent()
      .parent()
      .find(commonPageLocator.input)
      .type(vacancyDetails.hiringManager);

    cy.wait(500); // Wait for autocomplete to populate

    cy.get(recruitmentPageLocators.autocompleteWrapper)
      .should("be.visible")
      .find(commonPageLocator.listBox)
      .children()
      .eq(1)
      .click();

    cy.get(recruitmentPageLocators.numberOfPositionsInput)
      .parent()
      .parent()
      .find(commonPageLocator.input)
      .type(vacancyDetails.numberOfPositions);

    cy.get(commonPageLocator.saveButton).click();
  }
}

export const recruitmentPage = new RecruitmentPage();
