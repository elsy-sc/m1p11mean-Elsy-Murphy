const express = require("express"); 
const { getRouter } = require("../utils/route.express.util");
const { createPaiement , updatePaiement , deletePaiement } = require("../controllers/paiement.controller");
const router = express.Router();

router.post("/create", createPaiement);
// router.get("/read", readTypeDepense);
router.put("/update", updatePaiement);
router.delete("/delete", deletePaiement);

module.exports = getRouter(express, router, '/paiement');