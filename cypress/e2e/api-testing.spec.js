import { APITesting } from "../page-object-model/api-testing";

describe("API tesing", () => {
  beforeEach(() => {
    APITesting.apiLogin();
  });
  it("Create and Update HandHygine sensor", () => {
    APITesting.createHHSensor();
    APITesting.updateHHSensor();
  });
  it("Create and Delete Sensor", () => {
    APITesting.createSensor();
    APITesting.deleteSensor();
  });
});
