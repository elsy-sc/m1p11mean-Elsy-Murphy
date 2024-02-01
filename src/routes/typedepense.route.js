const express = require("express"); 
const { getRouter } = require("../utils/route.express.util");
const { createTypeDepense, readTypeDepense, updateTypeDepense, deleteTypeDepense } = require("../controllers/typedepense.controller");
const router = express.Router();

router.post("/create", createTypeDepense);
router.get("/read", readTypeDepense);
router.put("/update", updateTypeDepense);
router.delete("/delete", deleteTypeDepense);

module.exports = getRouter(express, router, '/typedepense');