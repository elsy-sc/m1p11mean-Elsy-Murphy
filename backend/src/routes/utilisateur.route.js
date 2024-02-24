const express = require("express"); 
const { getRouter } = require("../utils/route.express.util");
const { createUtilisateur , readUtilisateur , loginUtilisateur , updateUtilisateur , deleteUtilisateur , removeUtilisateur } = require("../controllers/utilisateur.controller");
const { testToken } = require("../middlewares/tokenobject.middleware");
const router = express.Router();

router.post("/login", loginUtilisateur);
router.post("/inscription", createUtilisateur);

router.use(testToken);

router.post("/create", createUtilisateur);
router.post("/read", readUtilisateur);
router.put("/update", updateUtilisateur);
router.delete("/delete", deleteUtilisateur);
router.delete("/remove",removeUtilisateur);

module.exports = getRouter(express, router, '/utilisateur');