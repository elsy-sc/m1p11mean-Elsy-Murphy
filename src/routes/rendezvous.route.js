const express = require("express"); 
const { getRouter } = require("../utils/route.express.util");
const { createRendezvous, readRendezvous, updateRendezvous, deleteRendezvous } = require("../controllers/rendezvous.controller");
const router = express.Router();

router.post("/create", createRendezvous);
router.get("/read", readRendezvous);
router.put("/update", updateRendezvous);
router.delete("/delete", deleteRendezvous);

module.exports = getRouter(express, router, '/rendezvous');