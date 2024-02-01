const { Depense } = require("../models/depense.model");
const { getMongoDBDatabase } = require("../utils/db.util");
const httpUtil = require("../utils/http.util");

async function createDepense(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const depense = new Depense(null,null,null);
        depense.setIdTypeDepense(req.body?.idtypedepense);
        depense.setMontant(req.body?.montant);
        depense.setDateDepense(req.body?.datedepense);

        await depense.create(db).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");        
        });
    } catch (error) {
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}

async function readDepense(req, res) {
    const db = await getMongoDBDatabase();
    try {
        await new Depense(req.body?.idtypedepense,  req.body?.montant , req.body?.datedepense).read(db).then((result) => {
            httpUtil.sendJson(res, result, 201, "OK");
        });
    } catch (error) {
        httpUtil.sendJson(res, null, 201, error.message);
    }
}

async function updateDepense(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const depenseWhere = new Depense();
        depenseWhere._id = req.body?._id;

        const depenseSet = new Depense();
        depenseSet.setIdTypeDepense(req.body?.idtypedepense);
        depenseSet.setMontant(req.body?.montant);
        depenseSet.setDateDepense(req.body?.datedepense);
        
        await depenseWhere.update(db, depenseSet).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");        
        });
    } catch (error) {
        httpUtil.sendJson(res, null,  error.status || error.statusCode || 500, error.message);
    }
}

async function deleteDepense(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const depense = new Depense(req.body?.idtypedepense,req.body?.montant,req.body?.datedepense);
        depense._id = req.body?._id;

        await depense.delete(db).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");        
        });
    } catch (error) {
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}

exports.createDepense = createDepense ;
exports.updateDepense = updateDepense;
exports.deleteDepense = deleteDepense;
exports.readDepense = readDepense;