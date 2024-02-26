const multer = require("multer");
const express = require("express"); 
const { getRouter } = require("../utils/route.express.util");
const { createOffrespeciale , readOffrespeciale , updateOffrespeciale , deleteOffrespeciale } = require("../controllers/offrespeciale.controller");
const { testToken } = require("../middlewares/tokenobject.middleware");
const router = express.Router();
const { upload } = require("../middlewares/upload.middleware");

router.use(testToken);

router.post("/create", upload, createOffrespeciale);
router.post("/read", readOffrespeciale);
router.put("/update", upload, updateOffrespeciale);
router.delete("/delete", deleteOffrespeciale);

module.exports = getRouter(express, router, '/offrespeciale');