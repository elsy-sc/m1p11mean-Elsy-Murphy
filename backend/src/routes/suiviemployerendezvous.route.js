const express = require("express"); 
const { getRouter } = require("../utils/route.express.util");
const { createSuiviEmployeRendezvous, readSuiviEmployeRendezvous, updateSuiviEmployeRendezvous, deleteSuiviEmployeRendezvous } = require("../controllers/suiviemployerendezvous.controller");
const router = express.Router();

router.post("/create", createSuiviEmployeRendezvous);
router.get("/read", readSuiviEmployeRendezvous);
router.put("/update", updateSuiviEmployeRendezvous);
router.delete("/delete", deleteSuiviEmployeRendezvous);

module.exports = getRouter(express, router, '/suiviemployerendezvous');