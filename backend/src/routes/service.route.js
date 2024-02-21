const express = require("express"); 
const { getRouter } = require("../utils/route.express.util");
const { createService, readService, updateService, deleteService } = require("../controllers/service.controller");
const { testToken } = require("../middlewares/tokenobject.middleware");
const router = express.Router();

router.use(testToken);

router.post("/create", createService);
router.post("/read", readService);
router.put("/update", updateService);
router.delete("/delete", deleteService);

module.exports = getRouter(express, router, '/service');