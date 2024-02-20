const express = require("express"); 
const { getRouter } = require("../utils/route.express.util");
const { createUtilisateur , readUtilisateur , loginUtilisateur , updateUtilisateur , deleteUtilisateur , inscriptionUtilisateur } = require("../controllers/utilisateur.controller");
const { testToken } = require("../middlewares/tokenobject.middleware");
const router = express.Router();

router.post("/login", loginUtilisateur);
router.post("/inscription", inscriptionUtilisateur);

router.use(testToken);

router.post("/create", createUtilisateur);
router.get("/read", readUtilisateur);
router.put("/update", updateUtilisateur);
router.delete("/delete", deleteUtilisateur);

module.exports = getRouter(express, router, '/utilisateur');