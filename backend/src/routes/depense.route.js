const express = require("express"); 
const { getRouter } = require("../utils/route.express.util");
const { createDepense , updateDepense , deleteDepense , readDepense } = require("../controllers/depense.controller");
const { testToken } = require("../middlewares/tokenobject.middleware");
const router = express.Router();

router.use(testToken);

router.post("/create", createDepense);
router.post("/read", readDepense);
router.put("/update", updateDepense);
router.delete("/delete", deleteDepense);

module.exports = getRouter(express, router, '/depense');