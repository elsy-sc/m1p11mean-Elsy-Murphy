const categorieserviceRoute = require("./categorieservice.route");
const UtilisateurRoute = require('./utilisateur.route');
const serviceRoute = require("./service.route");
const rendezvousRoute = require("./rendezvous.route");
const suiviemployerendezvousRoute = require("./suiviemployerendezvous.route");
const typedepenseRoute = require("./typedepense.route");
const paiementRoute = require("./paiement.route");
const employeRoute = require("./employe.route");
const offrespecialeRoute = require("./offrespeciale.route");
const depenseRoute = require("./depense.route");

module.exports = [categorieserviceRoute, serviceRoute , categorieserviceRoute,UtilisateurRoute, rendezvousRoute, suiviemployerendezvousRoute , employeRoute, offrespecialeRoute, typedepenseRoute , paiementRoute , depenseRoute];
