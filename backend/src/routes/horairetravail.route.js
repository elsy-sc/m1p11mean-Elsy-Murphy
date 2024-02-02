const express = require("express"); 
const { getRouter } = require("../utils/route.express.util");
const { createHoraireTravail , readHoraireTravail , updateHoraireTravail , deleteHoraireTravail } = require("../controllers/horairetravail.controller");
const router = express.Router();

router.post("/create", createHoraireTravail);
router.get("/read", readHoraireTravail);
router.put("/update", updateHoraireTravail);
router.delete("/delete", deleteHoraireTravail);

module.exports = getRouter(express, router, '/horairetravail');