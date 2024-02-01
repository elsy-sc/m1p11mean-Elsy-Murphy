const express = require("express"); 
const { getRouter } = require("../utils/route.express.util");
const { createDepense , updateDepense , deleteDepense } = require("../controllers/depense.controller");
const router = express.Router();

router.post("/create", createDepense);
// router.get("/read", readTypeDepense);
router.put("/update", updateDepense);
router.delete("/delete", deleteDepense);

module.exports = getRouter(express, router, '/depense');