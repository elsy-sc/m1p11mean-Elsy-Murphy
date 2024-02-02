const express = require("express"); 
const { getRouter } = require("../utils/route.express.util");
const { createOffrespeciale , readOffrespeciale , updateOffrespeciale , deleteOffrespeciale } = require("../controllers/offrespeciale.controller");
const router = express.Router();

router.post("/create", createOffrespeciale);
router.get("/read", readOffrespeciale);
router.put("/update", updateOffrespeciale);
router.delete("/delete", deleteOffrespeciale);

module.exports = getRouter(express, router, '/offrespeciale');