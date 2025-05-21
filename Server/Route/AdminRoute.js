const express = require("express");
const route = express.Router();
const AdminController = require("../Controllers/AdminController")

route.post("/adminlogin",AdminController.adminlogin);
route.post("/addemp",AdminController.addemp)
route.post("/assigntask",AdminController.assignTaskSave)
route.get("/assigntaskdisplay",AdminController.empDisplay)
route.get("/viewtask",AdminController.viewtask)
route.post("/deltask",AdminController.deltask)
route.post("/updatetask",AdminController.updatetask)
module.exports= route;