const express = require("express"); 
const { getRouter } = require("../utils/route.express.util");
const { createService, readService, updateService, deleteService } = require("../controllers/service.controller");
const router = express.Router();

router.post("/create", createService);
router.get("/read", readService);
router.put("/update", updateService);
router.delete("/delete", deleteService);

module.exports = getRouter(express, router, '/service');