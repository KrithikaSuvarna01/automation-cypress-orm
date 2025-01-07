import { apiTesting } from "../page-object-model/api-testing";

describe("API tesing", () => {
  beforeEach(() => {
    apiTesting.apiLogin();
  });
  it("Create and Update HandHygine sensor", () => {
    apiTesting.createHHSensor();
    apiTesting.updateHHSensor();
  });
  it("Create a Sensor", () => {
    apiTesting.createSensor();
    apiTesting.deleteSensor();
  });
});
