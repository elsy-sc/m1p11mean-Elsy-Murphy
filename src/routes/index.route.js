const categorieserviceRoute = require("./categorieservice.route");
const UtilisateurRoute = require('./utilisateur.route');
const serviceRoute = require("./service.route");
const rendezvousRoute = require("./rendezvous.route");

module.exports = [categorieserviceRoute, serviceRoute , categorieserviceRoute,UtilisateurRoute, rendezvousRoute];
