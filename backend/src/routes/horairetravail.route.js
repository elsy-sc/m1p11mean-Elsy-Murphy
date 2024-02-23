const express = require("express"); 
const { getRouter } = require("../utils/route.express.util");
const { createHoraireTravail , readHoraireTravail , updateHoraireTravail , deleteHoraireTravail } = require("../controllers/horairetravail.controller");
const { testToken } = require("../middlewares/tokenobject.middleware");
const router = express.Router();

router.use(testToken);

router.post("/create", createHoraireTravail);
router.post("/read", readHoraireTravail);
router.put("/update", updateHoraireTravail);
router.delete("/delete", deleteHoraireTravail);

module.exports = getRouter(express, router, '/horairetravail');