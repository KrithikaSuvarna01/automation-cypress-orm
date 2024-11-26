class AdminPage {
  createUser(userData) {
    cy.contains("button", " Add ").click();
    cy.contains("h6", "Add User").should("be.visible");

    cy.contains("label", "User Role")
      .parent()
      .parent()
      .find('div[class="oxd-select-text-input"]')
      .click();
    cy.get(".oxd-select-option").contains(userData.role).click();

    cy.contains("label", "Employee Name")
      .parent()
      .parent()
      .find("input")
      .type(userData.employeeName);
    cy.wait(500);
    cy.get(".oxd-autocomplete-wrapper")
      .should("be.visible")
      .find('div[role="listbox"]')
      .children()
      .eq(2)
      .click();

    cy.contains("label", "Status")
      .parent()
      .parent()
      .find('div[class="oxd-select-text-input"]')
      .click();
    cy.get(".oxd-select-option").contains(userData.status).click();

    cy.contains("label", "Username")
      .parent()
      .parent()
      .find("input")
      .type(userData.username);
    cy.contains("label", "Password")
      .parent()
      .parent()
      .find("input")
      .type(userData.password);
    cy.contains("label", "Confirm Password")
      .parent()
      .parent()
      .find("input")
      .type(userData.password);

    cy.contains("button", " Save ").click();
    cy.wait(5000);
    cy.contains("h5", "System Users").should("be.visible");
  }

  verifyUserAndDelete(username) {
    cy.contains("label", "Username")
      .parent()
      .parent()
      .find("input")
      .type(username);
    cy.contains("button", "Search").click();

    cy.get(".orangehrm-container").children().should("contain", username);
    cy.get(".oxd-table-body .oxd-table-row")
      .first()
      .find('input[type="checkbox"]')
      .check({ force: true });

    cy.contains("button", " Delete Selected ").click({ force: true });
    cy.contains("p", "Are you Sure?").should("be.visible");
    cy.contains("button", " Yes, Delete ").click({ force: true });

    cy.get(".orangehrm-container").children().should("not.contain", username);
  }

  navigateToJobTitles() {
    cy.contains("span", "Job ").click();
    cy.contains("a", "Job Titles").click();
  }

  addJob(jobData) {
    cy.contains("button", " Add ").click();
    cy.contains("h6", "Add Job Title").should("be.visible");

    cy.contains("label", "Job Title")
      .parent()
      .parent()
      .find("input")
      .type(jobData.jobTitle);

    cy.contains("label", "Job Description")
      .parent()
      .parent()
      .find("textarea")
      .type(jobData.jobDescription);

    cy.contains("label", "Note")
      .parent()
      .parent()
      .find("textarea")
      .type(jobData.note);

    cy.contains("label", "Job Specification")
      .parent()
      .parent()
      .find("input[type='file']")
      .selectFile(`cypress/fixtures/${jobData.specificationFile}`, {
        force: true,
      });

    cy.contains("button", " Save ").click();
  }

  verifyJobExistsAndDelete(jobTitle) {
    cy.wait(10000);

    cy.contains('div[role="row"]', jobTitle)
      .should("exist")
      .within(() => {
        cy.get('input[type="checkbox"]').should("exist").check({ force: true });
      });

    cy.contains("button", " Delete Selected ").click({ force: true });

    cy.contains("p", "Are you Sure?").should("be.visible");
    cy.contains("button", " Yes, Delete ").click({ force: true });

    cy.contains('div[role="row"]', jobTitle).should("not.exist");
  }
}

export const adminPage = new AdminPage();
