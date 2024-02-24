const express = require("express"); 
const { getRouter } = require("../utils/route.express.util");
const { createTypeDepense, readTypeDepense, updateTypeDepense, deleteTypeDepense } = require("../controllers/typedepense.controller");
const { testToken } = require("../middlewares/tokenobject.middleware");
const router = express.Router();

router.use(testToken);

router.post("/create", createTypeDepense);
router.post("/read", readTypeDepense);
router.put("/update", updateTypeDepense);
router.delete("/delete", deleteTypeDepense);

module.exports = getRouter(express, router, '/typedepense');