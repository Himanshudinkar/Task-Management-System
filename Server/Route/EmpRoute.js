const express= require("express");
const route = express.Router();
const EmpController = require("../Controllers/EmpController")

route.post("/employeelogin",EmpController.emplogin);
route.post("/emptaskdisplay", EmpController.empTaskDisplay);
route.post("/emptasksubmit", EmpController.empTaskSubmit);
route.post("/changepassword", EmpController.passwordChange);

module.exports = route;