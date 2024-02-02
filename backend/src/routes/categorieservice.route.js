const express = require("express"); 
const { getRouter } = require("../utils/route.express.util");
const { createCategorieservice, readCategorieservice, updateCategorieservice, deleteCategorieservice } = require("../controllers/categorieservice.controller");
const router = express.Router();

router.post("/create", createCategorieservice);
router.get("/read", readCategorieservice);
router.put("/update", updateCategorieservice);
router.delete("/delete", deleteCategorieservice);

module.exports = getRouter(express, router, '/categorieservice');