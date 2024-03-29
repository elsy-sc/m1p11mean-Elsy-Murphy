const express = require("express"); 
const { getRouter } = require("../utils/route.express.util");
const { createRendezvous, readRendezvous, updateRendezvous, deleteRendezvous, nombreRendezVousParMois, nombrenombreRendezVousParJour, beneficeNetParMois, beneficeNetParJour, rappelRendezvous, sendMailRappel , suiviTacheEffectues } = require("../controllers/rendezvous.controller");
const { testToken } = require("../middlewares/tokenobject.middleware");
const router = express.Router();

router.use(testToken);

router.post("/create", createRendezvous);
router.post("/read", readRendezvous);
router.put("/update", updateRendezvous);
router.delete("/delete", deleteRendezvous);
router.post("/nombrerendezvousparmois", nombreRendezVousParMois);
router.post("/nombrenombrerendezvousparjour", nombrenombreRendezVousParJour);
router.post("/beneficenetparmois", beneficeNetParMois);
router.post("/beneficenetparjour", beneficeNetParJour);
router.post("/rappelRendezvous", rappelRendezvous);
router.post("/sendMailRappelRendezvous", sendMailRappel);
router.post("/suivitacheeffectues", suiviTacheEffectues);

module.exports = getRouter(express, router, '/rendezvous');