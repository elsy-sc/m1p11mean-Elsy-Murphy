const express = require("express"); 
const { getRouter } = require("../utils/route.express.util");
const { createCategorieservice, readCategorieservice, updateCategorieservice, deleteCategorieservice } = require("../controllers/categorieservice.controller");
const { testToken } = require("../middlewares/tokenobject.middleware");
const router = express.Router();

router.use(testToken);

router.post("/create", createCategorieservice);
router.post("/read", readCategorieservice);
router.put("/update", updateCategorieservice);
router.delete("/delete", deleteCategorieservice);

module.exports = getRouter(express, router, '/categorieservice');