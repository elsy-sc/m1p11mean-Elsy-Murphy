const categorieserviceRoute = require("./categorieservice.route");
const UtilisateurRoute = require('./utilisateur.route');
const serviceRoute = require("./service.route");
const rendezvousRoute = require("./rendezvous.route");
const suiviemployerendezvousRoute = require("./suiviemployerendezvous.route");
const employe = require("./employe.route");
const typedepense = require("./typedepense.route");

module.exports = [categorieserviceRoute, serviceRoute , categorieserviceRoute,UtilisateurRoute, rendezvousRoute, suiviemployerendezvousRoute , employe , typedepense];
