class RecruitmentPage {
  navigateToRecruitment() {
    cy.contains("a", "Recruitment").click();
  }

  addCandidate(candidate) {
    cy.contains("button", " Add ").click();
    cy.get('[name="firstName"]').type(candidate.firstName);
    cy.get('[name="middleName"]').type(candidate.middleName);
    cy.get('[name="lastName"]').type(candidate.lastName);
    cy.contains("div", "-- Select --").click();
    cy.get(".oxd-select-wrapper").find('div[role="option"]').eq(1).click();
    cy.contains("label", "Email")
      .parent()
      .parent()
      .find("input")
      .type(candidate.email);
    cy.contains("label", "Contact Number")
      .parent()
      .parent()
      .find("input")
      .type(candidate.contactNumber);
    cy.get('[type="file"]').selectFile(`cypress/fixtures/${candidate.resume}`, {
      force: true,
    });
    cy.contains("label", "Keywords")
      .parent()
      .parent()
      .find("input")
      .type(candidate.keywords);
    cy.contains("label", "Notes")
      .parent()
      .parent()
      .find("textarea")
      .type(candidate.notes);
    cy.get('[type="checkbox"]').check({ force: true });
    cy.contains("button", " Save ").click();
  }

  verifyCandidate(candidate) {
    cy.contains(
      "p",
      `${candidate.firstName} ${candidate.middleName} ${candidate.lastName}`
    ).should("be.visible");
  }

  addVacancy(vacancyDetails) {
    cy.contains("a", "Vacancies").click();
    cy.contains("button", " Add ").click();
    cy.contains("h6", "Add Vacancy").should("be.visible");

    cy.contains("label", "Vacancy Name")
      .parent()
      .parent()
      .find("input")
      .type(vacancyDetails.vacancyName);

    cy.contains("label", "Job Title")
      .parent()
      .parent()
      .find(".oxd-select-wrapper")
      .click();

    // Select the first option in the Job Title dropdown
    cy.get(".oxd-select-wrapper .oxd-select-text-input")
      .should("be.visible")
      .then(() => {
        cy.get(".oxd-select-wrapper").find('div[role="option"]').eq(1).click();
      });

    cy.contains("label", "Description")
      .parent()
      .parent()
      .find("textarea")
      .type(vacancyDetails.description);

    cy.contains("label", "Hiring Manager")
      .parent()
      .parent()
      .find("input")
      .type(vacancyDetails.hiringManager);

    cy.wait(500); // Wait for autocomplete to populate

    cy.get(".oxd-autocomplete-wrapper")
      .should("be.visible")
      .find('div[role="listbox"]')
      .children()
      .eq(1)
      .click();

    cy.contains("label", "Number of Positions")
      .parent()
      .parent()
      .find("input")
      .type(vacancyDetails.numberOfPositions);

    cy.contains("button", " Save ").click();
  }
}

export const recruitmentPage = new RecruitmentPage();
