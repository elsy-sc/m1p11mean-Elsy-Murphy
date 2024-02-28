const express = require("express"); 
const { getRouter } = require("../utils/route.express.util");
const { createSuiviEmployeRendezvous, readSuiviEmployeRendezvous, updateSuiviEmployeRendezvous, deleteSuiviEmployeRendezvous, prendreRendezvous, prendreEmployeDisponible } = require("../controllers/suiviemployerendezvous.controller");
const router = express.Router();

router.post("/create", createSuiviEmployeRendezvous);
router.post("/read", readSuiviEmployeRendezvous);
router.put("/update", updateSuiviEmployeRendezvous);
router.delete("/delete", deleteSuiviEmployeRendezvous);
router.post("/prendreRendezVous", prendreRendezvous);
router.post("/prendreEmployeDisponible", prendreEmployeDisponible);

module.exports = getRouter(express, router, '/suiviemployerendezvous');