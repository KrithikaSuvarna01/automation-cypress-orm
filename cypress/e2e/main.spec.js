import { handHygineSensorData } from "../fixtures/hand-hygine-sensors";
import { loginPagData } from "../fixtures/login-page";
import { HandHygieneSensorsPage } from "../page-object-model/hand-hygine-sensor";
import { LoginPage } from "../page-object-model/login-page";
import { SensorsPage } from "../page-object-model/sensors";
import { sensorDatas } from "../fixtures/sensor-data";
import { GatewayPage } from "../page-object-model/gateway-management";
import { gatewayDatas } from "../fixtures/gateway-data";

describe("template spec", () => {
  beforeEach(() => {
    cy.visit("/");
    LoginPage.verifyLoginPage();
    LoginPage.login(loginPagData.email, loginPagData.password);
    LoginPage.verifySuccessfulLogin(loginPagData.email, loginPagData.password);
  });

  it("Should add multiple hand hygiene sensors", () => {
    HandHygieneSensorsPage.visitDeviceManagement();
    HandHygieneSensorsPage.openHHSensorTab();

    handHygineSensorData.forEach((sensorData) => {
      HandHygieneSensorsPage.addHHSensor(sensorData);
    });
  });
  it("Should Create Multiple Sensors", () => {
    HandHygieneSensorsPage.visitDeviceManagement();
    SensorsPage.openSensorTab();
    sensorDatas.forEach((sensorData) => {
      SensorsPage.addSensor(sensorData);
      SensorsPage.searchSensor(sensorData.sensorId);
      SensorsPage.deleteSensor();
    });
  });

  it.only("Should Create Gateway unassign them and delete them", () => {
    HandHygieneSensorsPage.visitDeviceManagement();
    GatewayPage.openGatewayTab();
    gatewayDatas.forEach((gatewayData) => {
      GatewayPage.createGateway(gatewayData);
      GatewayPage.unassignAnddeleteGateway(gatewayData.SIDLabel);
    });
  });
});
