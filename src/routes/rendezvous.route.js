const express = require("express"); 
const { getRouter } = require("../utils/route.express.util");
const { createRendervous, readRendervous, updateRendervous, deleteRendervous } = require("../controllers/Rendervous.controller");
const router = express.Router();

router.post("/create", createRendervous);
router.get("/read", readRendervous);
router.put("/update", updateRendervous);
router.delete("/delete", deleteRendervous);

module.exports = getRouter(express, router, '/rendervous');