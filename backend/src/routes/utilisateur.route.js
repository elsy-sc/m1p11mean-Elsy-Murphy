const express = require("express"); 
const { getRouter } = require("../utils/route.express.util");
const { createUtilisateur , readUtilisateur , loginUtilisateur , updateUtilisateur , deleteUtilisateur } = require("../controllers/utilisateur.controller");
const router = express.Router();


router.post("/login", loginUtilisateur);
router.post("/create", createUtilisateur);
router.get("/read", readUtilisateur);
router.put("/update", updateUtilisateur);
router.delete("/delete", deleteUtilisateur);

module.exports = getRouter(express, router, '/utilisateur');