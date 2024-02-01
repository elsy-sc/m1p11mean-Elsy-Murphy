const express = require("express"); 
const { getRouter } = require("../utils/route.express.util");
const { createEmploye , readEmploye , updateEmploye , deleteEmploye , loginEmploye  } = require("../controllers/employe.controller");
const router = express.Router();

router.post("/create", createEmploye);
router.get("/read", readEmploye);
router.post("/login", loginEmploye);
router.put("/update", updateEmploye);
router.delete("/delete", deleteEmploye);

module.exports = getRouter(express, router, '/employe');