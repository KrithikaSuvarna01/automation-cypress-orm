import { commonSelectors } from "../utils/selectors/common-selectors";
import { gatewayLocator } from "../utils/selectors/gateway";

export class GatewayPage {
  /**
   * Opens the "Gateway Management" tab by clicking on it and verifies
   * that the "Gateways" text is visible on the page.
   */
  static openGatewayTab() {
    cy.xpath(gatewayLocator.gatewayManagementTab).click({
      force: true,
    });
    cy.get(gatewayLocator.gatewaysText).should("be.visible");
  }

  /**
   * Creates a Gateway by filling out the form based on the given gatewaydata.
   * This function performs several steps to ensure that all necessary
   * fields are completed and the gateway is successfully created.
   * @param {Object} gatewaydata - An object containing the details of the gateway:
   *  - manufacturer: The manufacturer of the gateway (e.g., HID, Kontakt)
   *  - SIDLabel: The unique identifier for the gateway
   *  - gatewayType: The type of the gateway
   *  - gatewayName: The name of the gateway
   *  - locationPolicyLabel: The location policy associated with the gateway
   *  - building: The building where the gateway is located
   *  - floor: The floor where the gateway is located
   *  - location: The specific location of the gateway
   */

  static createGateway(gatewaydata) {
    cy.get(gatewayLocator.addGatewayButton).click();
    cy.get(gatewayLocator.manufacturerLabel)
      .parent()
      .find(commonSelectors.button)
      .click({ force: true });
    cy.get(gatewayLocator.manufacturerOption(gatewaydata.manufacturer)).click({
      force: true,
    });
    cy.get(gatewayLocator.gatewaySIDLabel)
      .parent()
      .find(commonSelectors.input)
      .type(gatewaydata.SIDLabel, { force: true });
    cy.get(gatewayLocator.gatewayTypeLabel)
      .parent()
      .find(commonSelectors.button)
      .click({ force: true });
    cy.get(gatewayLocator.gatewayTypeOption(gatewaydata.gatewayType)).click({
      force: true,
    });
    cy.get(gatewayLocator.gatewayNameLabel)
      .parent()
      .find(commonSelectors.input)
      .type(gatewaydata.gatewayName, { force: true });
    cy.get(gatewayLocator.locationPolicyLabel)
      .parent()
      .find(commonSelectors.input)
      .type(gatewaydata.locationPolicyLabel, { force: true });
    cy.get(gatewayLocator.buildingLabel)
      .parent()
      .find(commonSelectors.button)
      .click({ force: true });
    cy.get(gatewayLocator.buildingOption(gatewaydata.building)).click({
      force: true,
    });
    cy.get(gatewayLocator.floorLabel)
      .parent()
      .find(commonSelectors.button)
      .click({ force: true });
    cy.get(gatewayLocator.floorOption(gatewaydata.floor)).click({
      force: true,
    });
    cy.get(gatewayLocator.selectLocationInput).click({ force: true });
    cy.get(gatewayLocator.locationOption(gatewaydata.location)).click({
      force: true,
    });
    cy.get(gatewayLocator.createButton).click({ force: true });
    cy.get(gatewayLocator.successMessage).should("be.visible");
  }

  /**
   * Unassigns and deletes a gateway given its SID label.
   * @param {string} SIDLabel - The SID label of the gateway to be unassigned and deleted.
   */
  static unassignAnddeleteGateway(SIDLabel) {
    cy.get(gatewayLocator.rowRole).contains(SIDLabel).click({ force: true });
    cy.get(gatewayLocator.unassignButton).click({ force: true });
    cy.get(gatewayLocator.unAssignText).should("be.visible");
    cy.get(gatewayLocator.unAssignConfirmButton).click({ force: true });
    cy.get(gatewayLocator.unassignSuccessMessage).should("be.visible");
    cy.get(gatewayLocator.rowRole).contains(SIDLabel).click({ force: true });
    cy.get(gatewayLocator.deleteButton).click({ force: true });
    cy.get(gatewayLocator.deleteConfirmationMessage).should("be.visible");
    cy.get(gatewayLocator.deleteConfirmButton).click({ force: true });
    cy.get(gatewayLocator.deleteSuccessMessage).should("be.visible");
  }
}
