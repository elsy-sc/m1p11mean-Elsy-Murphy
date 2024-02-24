const { Paiement } = require("../models/paiement.model");
const { getMongoDBDatabase } = require("../utils/db.util");
const httpUtil = require("../utils/http.util");

async function createPaiement(req, res) {
    const db = await getMongoDBDatabase();
    let errors = [];

    try {
        const paiement = new Paiement(null, null, null, null);
        paiement.setIdclient(req.body?.idclient);
        paiement.setIdRendezVous(req.body?.idrendezvous);
        paiement.setMontantPaye(req.body?.montantpaye);
        paiement.setDateHeurePaiement(req.body?.dateheurepaiement);

        await paiement.create(db).then(() => {
            httpUtil.sendJson(res, null, 201, "Created");
        });
    } catch (error) {
        if (error.field && error.message) {
            errors.push(error);
        }
        else if (error.code) {
            let field = error.keyPattern ? Object.keys(error.keyPattern)[0] : null;
            if (field) {
                let error = {
                    field: field,
                    message: field + " déjà utilisée. Veuillez choisir une autre " + field
                }
                errors.push(error);
            }
        }
        httpUtil.sendJson(res, errors, 422, "error");
    }
}

async function readPaiement(req, res) {
    const db = await getMongoDBDatabase();
    try {
        await new Paiement(req.body?.idclient, req.body?.idrendezvous, req.body?.montantpaye, req.body?.dateheurepaiement).read(db).then((result) => {
            httpUtil.sendJson(res, result, 201, "OK");
        });
    } catch (error) {
        httpUtil.sendJson(res, null, 201, error.message);
    }
}

async function updatePaiement(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const paiementWhere = new Paiement();
        paiementWhere._id = req.body?._id;

        const paiementSet = new Paiement();
        paiementSet.setIdclient(req.body?.idclient);
        paiementSet.setIdRendezVous(req.body?.idrendezvous);
        paiementSet.setMontantPaye(req.body?.montantpaye);
        paiementSet.setDateHeurePaiement(req.body?.dateheurepaiement);

        await paiementWhere.update(db, paiementSet).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");
        });
    } catch (error) {
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}

async function deletePaiement(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const paiement = new Paiement(req.body?.idclient, req.body?.idrendezvous, req.body?.montantpaye, req.body.dateheurepaiement);
        paiement._id = req.body?._id;

        await paiement.delete(db).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");
        });
    } catch (error) {
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}

exports.createPaiement = createPaiement;
exports.updatePaiement = updatePaiement;
exports.deletePaiement = deletePaiement;
exports.readPaiement = readPaiement;