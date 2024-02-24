const express = require("express"); 
const { getRouter } = require("../utils/route.express.util");
const { createEmploye , readEmploye , updateEmploye , deleteEmploye , loginEmploye  } = require("../controllers/employe.controller");
const { testToken } = require("../middlewares/tokenobject.middleware");
const router = express.Router();

router.use(testToken);

router.post("/create", createEmploye);
router.post("/read", readEmploye);
router.post("/login", loginEmploye);
router.put("/update", updateEmploye);
router.delete("/delete", deleteEmploye);

module.exports = getRouter(express, router, '/employe');