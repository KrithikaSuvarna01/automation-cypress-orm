import { commonSelectors } from "../utils/selectors/common-selectors";
import { sensor } from "../utils/selectors/sensor";
export class SensorsPage {
  /**
   * Opens the "Sensor Management" tab by clicking on it and verifies
   * that the "Sensors" text is visible on the page.
   */
  static openSensorTab() {
    cy.xpath(sensor.sensorManagementTab).click({ force: true });
    cy.get(sensor.sensorText).should("be.visible");
  }

  /**
   * Adds a Sensor by filling out the form based on the given sensorData.
   * This function is intended to be used in a loop to add multiple sensors.
   * @param {Object} sensorData - An object with the following properties:
   *  - sensorId: The sensor ID
   *  - sensorType: The sensor type (Temperature, Humidity, etc.)
   *  - manufacturerOption: The manufacturer option (Centrak, etc.)
   *  - model: The model of the sensor
   */
  static addSensor(sensorData) {
    cy.get(sensor.addSensorButton).click();
    cy.get(sensor.sensorIdField).type(sensorData.sensorId, {
      force: true,
    });
    cy.get(sensor.sensorTypeDropdown).click({ force: true });
    cy.contains("div", sensorData.sensorType).click({ force: true });
    cy.get(sensor.manufacturer)
      .parent()
      .find(commonSelectors.button)
      .click({ force: true });
    cy.get(sensor.manufacturerOption)
      .contains(sensorData.manufacturerOption)
      .click({ force: true });
    cy.get(sensor.model)
      .parent()
      .find(commonSelectors.input)
      .type(sensorData.model, { force: true });
    cy.get(sensor.createButton).click({ force: true });
    cy.get(sensor.successToast).should("be.visible");
  }

  /**
   * Searches for a sensor by its ID.
   * @param {string} sensorId - The ID of the sensor to search for.
   */
  static searchSensor(sensorId) {
    cy.get(sensor.seachInput).type(sensorId);
    cy.get(sensor.searchButton).click({ force: true });
  }
  /**
   * Deletes the first sensor in the list by clicking the delete button, confirming the deletion,
   * and verifying that a success message is displayed.
   */

  static deleteSensor() {
    cy.get(sensor.deleteButton).first().click();
    cy.get(sensor.deleteSensortext).should("be.visible");
    cy.get(sensor.deleteConfirm).click({ force: true });
    cy.get(sensor.deleteToast).should("be.visible");
  }
}
