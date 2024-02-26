const multer = require("multer");
const express = require("express"); 
const { getRouter } = require("../utils/route.express.util");
const { createService, readService, updateService, deleteService } = require("../controllers/service.controller");
const { testToken } = require("../middlewares/tokenobject.middleware");
const { upload } = require("../middlewares/upload.middleware");
const router = express.Router();

router.use(testToken);

router.post("/create", upload, createService);
router.post("/read", readService);
router.put("/update", upload, updateService);
router.delete("/delete", deleteService);

module.exports = getRouter(express, router, '/service');