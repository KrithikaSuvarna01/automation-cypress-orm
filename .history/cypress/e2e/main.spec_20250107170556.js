import { handHygineSensorData } from "../fixtures/hand-hygine-sensors";
import { loginPagData } from "../fixtures/login-page";
import { HandHygieneSensorsPage } from "../page-object-model/hand-hygine-sensor";
import { loginPage } from "../page-object-model/login-page";
import { SensorsPage } from "../page-object-model/sensors";
import { sensorDatas } from "../fixtures/sensor-data";

describe("template spec", () => {
  beforeEach(() => {
    cy.visit("/");
    loginPage.verifyLoginPage();
    loginPage.login(loginPagData.email, loginPagData.password);
    loginPage.verifySuccessfulLogin(loginPagData.email, loginPagData.password);
  });

  it("Should add multiple hand hygiene sensors", () => {
    HandHygieneSensorsPage.visitDeviceManagement();
    HandHygieneSensorsPage.openHHSensorTab();

    handHygineSensorData.forEach((sensorData) => {
      HandHygieneSensorsPage.addHHSensor(sensorData);
    });
  });
  it.only("Should Create Multiple Sensors", () => {
    handHygieneSensorsPage.visitDeviceManagement();
    SensorsPage.openSensorTab();
    sensorDatas.forEach((sensorData) => {
      SensorsPage.addSensor(sensorData);
      SensorsPage.searchSensor(sensorData.sensorId);
      SensorsPage.deleteSensor();
    });
  });
});
