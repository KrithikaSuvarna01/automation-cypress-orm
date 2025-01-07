import { commonSelectors } from "../utils/selectors/common-selectors";
import { hhSensorsLocators } from "../utils/selectors/hand-hygine-sensor";
export class HandHygieneSensorsPage {
  /**
   * Clicks on the "Device Management" tab and verifies if the "Device Management" text is visible
   */
  static visitDeviceManagement() {
    cy.get(hhSensorsLocators.deviceManagementTab).click();

    cy.get(hhSensorsLocators.deviceManagementText).should("be.visible");
  }
  /**
   * Opens the "HH Sensor Management" tab by clicking on it and verifies
   * that the "Hand Hygiene Sensors" text is visible on the page.
   */
  openHHSensorTab() {
    cy.get(hhSensorsLocators.hhSensorTab).click();
    cy.get(hhSensorsLocators.handHygineSensorsText).should("be.visible");
  }

  /**
   * Adds a Hand Hygiene sensor by filling out the form based on the given sensorData.
   * This function is intended to be used in a loop to add multiple sensors.
   * @param {Object} sensorData - An object with the following properties:
   *  - manufacturer: The sensor manufacturer (HID or Kontakt)
   *  - hhSensorID: The ID of the sensor
   *  - hhSensorType: The type of the sensor (Automatic or Manual)
   *  - hhSensorName: The name of the sensor
   *  - heartAndHealthSensor: The name of the Heart and Health sensor
   *  - managementAndMaintainance: The text to enter in the "Management and Maintenance" field
   *  - manualDispenseCounts: The text to enter in the "Manual Dispense Counts" field
   */
  static addHHSensor(sensorData) {
    cy.get(hhSensorsLocators.addHHSensorButton).click();
    cy.get(hhSensorsLocators.hhSensorManufacturer)
      .parent()
      .find(commonSelectors.button)
      .click({ force: true });
    if (sensorData.manufacturer === "HID") {
      cy.get(hhSensorsLocators.HIDOption).click({ force: true });
      cy.get(hhSensorsLocators.hhSensorPolicyLabel)
        .parent()
        .find(commonSelectors.input)
        .type(sensorData.managementAndMaintainance, {
          force: true,
        });
    } else {
      cy.get(hhSensorsLocators.KontaktOption).click({ force: true });
    }

    cy.get(hhSensorsLocators.hhSensorID)
      .parent()
      .find(commonSelectors.input)
      .type(sensorData.hhSensorID, { force: true });

    cy.get(hhSensorsLocators.hhSensorType)
      .parent()
      .find(commonSelectors.span)
      .click({ force: true });
    if (sensorData.hhSensorType === "Manual") {
      cy.get(hhSensorsLocators.manualOption).click({ force: true });
      cy.get(hhSensorsLocators.manualDispenseCounts)
        .parent()
        .find(commonSelectors.input)
        .type(sensorData.manualDispenseCounts, { force: true });
    } else {
      cy.get(hhSensorsLocators.automaticOption).click({ force: true });
    }

    cy.get(hhSensorsLocators.hhSensorName)
      .parent()
      .find(commonSelectors.input)
      .type(sensorData.heartAndHealthSensor, { force: true });

    cy.get(hhSensorsLocators.createButton).click({ force: true });
    cy.get(hhSensorsLocators.successToast).should("be.visible");
  }
}

export const handHygieneSensorsPage = new HandHygieneSensorsPage();
