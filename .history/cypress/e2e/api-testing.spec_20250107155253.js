const { apiTesting } = require("../page-object-model/api");
const { apiTesting } = require("../page-object-model/api");

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
