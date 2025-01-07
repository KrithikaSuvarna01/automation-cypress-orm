import "cypress-plugin-api";
import { createHHSensorDatA } from "../fixtures/create-hhs-api";
import { updateHHSensorDatA } from "../fixtures/update-hhs-api";
import { createSensorAPIData } from "../fixtures/sensor-api";
export class APITesting {
  /**
   * API Testing Class for handling API operations.
   */
  static apiLogin() {
    cy.api({
      method: "POST",
      url: "https://stg-cox-health-imagine-api.leverege.com/v1/login",
      body: {
        username: Cypress.env("userEmail"),
        password: Cypress.env("userPassword"),
        projectId: Cypress.env("projectId"),
      },
    }).then((response) => {
      cy.wrap(response.body.idToken).as("authToken");
    });
  }

  /**
   * Creates a new HH Sensor using the API.
   * @param {string} authToken - The authentication token for API requests.
   * @returns {Cypress.Chainable} A chainable Cypress object containing the created sensor's ID.
   */
  static createHHSensor() {
    cy.get("@authToken").then((authToken) => {
      cy.api({
        method: "POST",
        url: "https://stg-cox-health-imagine-api.leverege.com/v1/interface/4feYb9OZYr8j1YLy9qFBT6/hospital/5Er9CQ2heTt0fPSyae6bFR/tags",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: createHHSensorDatA,
      }).then((result) => {
        expect(result.status).to.equal(200);
        expect(result.statusText).to.be.ok;
        expect(result.body.name).to.equal(createHHSensorDatA.name);
        expect(result.body.networkId).to.equal(createHHSensorDatA.networkId);
        expect(result.body.networkAliases["hid-beacons"].deviceId).to.equal(
          createHHSensorDatA.networkAliases["hid-beacons"].deviceId
        );
        cy.wrap(result.body.id).as("hhSensorId");
      });
    });
  }

  /**
   * Updates an existing HH Sensor using the API.
   * @param {string} id - The ID of the sensor to update.
   * @param {string} authToken - The authentication token for API requests.
   * @returns {Cypress.Chainable} A chainable Cypress object containing the updated sensor's ID.
   */
  static updateHHSensor() {
    cy.get("@authToken").then((authToken) => {
      cy.get("@hhSensorId").then((id) => {
        cy.api({
          method: "PATCH",
          url: `https://stg-cox-health-imagine-api.leverege.com/v1/interface/4feYb9OZYr8j1YLy9qFBT6/hospital/5Er9CQ2heTt0fPSyae6bFR/tags/${id}`,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: updateHHSensorDatA,
        }).then((result) => {
          expect(result.status).to.equal(200);
          expect(result.statusText).to.be.ok;
          expect(result.body.name).to.equal(updateHHSensorDatA.name);
          expect(result.body.networkId).to.equal(updateHHSensorDatA.networkId);
          expect(result.body.networkAliases["hid-beacons"].deviceId).to.equal(
            updateHHSensorDatA.networkAliases["hid-beacons"].deviceId
          );
        });
      });
    });
  }

  /**
   * Creates a new sensor using the API.
   * @param {string} authToken - The authentication token for API requests.
   * @returns {Cypress.Chainable} A chainable Cypress object containing the created sensor's ID.
   */
  static createSensor() {
    cy.get("@authToken").then((authToken) => {
      cy.api({
        method: "Post",
        url: "https://stg-cox-health-imagine-api.leverege.com/v1/interface/4feYb9OZYr8j1YLy9qFBT6/hospital/5Er9CQ2heTt0fPSyae6bFR/sensors",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: createSensorAPIData,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.statusText).to.be.ok;
        cy.wrap(response.body.id).as("sensorId");
      });
    });
  }

  /**
   * Deletes a sensor using the API.
   * @param {string} sensorId - The ID of the sensor to delete.
   * @param {string} authToken - The authentication token for API requests.
   * @returns {Cypress.Chainable} A chainable Cypress object containing the response from the API.
   */
  static deleteSensor() {
    cy.get("@sensorId").then((sensorId) => {
      cy.get("@authToken").then((authToken) => {
        cy.api({
          method: "Delete",
          url: `https://stg-cox-health-imagine-api.leverege.com/v1/interface/4feYb9OZYr8j1YLy9qFBT6/hospital/5Er9CQ2heTt0fPSyae6bFR/sensors/${sensorId}`,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.statusText).to.be.ok;
        });
      });
    });
  }
}
