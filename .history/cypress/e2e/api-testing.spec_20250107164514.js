import { apiTesting } from "../page-object-model/api-testing";

describe("API tesing", () => {
  beforeEach(() => {
    apiTesting.apiLogin();
  });
  it("API testing", () => {
    apiTesting.createHHSensor();
    apiTesting.updateHHSensor();
  });
  it("Create a Sensor", () => {
    apiTesting.createSensor();
    apiTesting.deleteSensor();
  });
});
