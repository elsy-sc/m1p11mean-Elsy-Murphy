const { HoraireTravail } = require("../models/horairetravail.model");
const { getMongoDBDatabase } = require("../utils/db.util");
const httpUtil = require("../utils/http.util");

async function createHoraireTravail(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const horairetravail = new HoraireTravail(null,null,null);
        horairetravail.setIdEmploye(req.body?.idemploye);
        horairetravail.setJour(req.body?.jour);
        horairetravail.setHeures(req.body?.heures);

        await horairetravail.create(db).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");        
        });
    } catch (error) {
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}

async function readHoraireTravail(req, res) {
    const db = await getMongoDBDatabase();
    try {
        await new HoraireTravail(req.body?.idemploye, req.body?.jour , req.body?.heures).read(db).then((result) => {
            httpUtil.sendJson(res, result, 201, "OK");
        });
    } catch (error) {
        httpUtil.sendJson(res, null, 201, error.message);
    }
}

async function updateHoraireTravail(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const horairetravailWhere = new HoraireTravail();
        horairetravailWhere._id = req.body?._id;

        const horairetravailSet = new HoraireTravail(null,null,null);
        horairetravailSet.setIdEmploye(req.body?.idemploye);
        horairetravailSet.setJour(req.body?.jour);
        horairetravailSet.setHeures(req.body?.heures);
        
        await horairetravailWhere.update(db, horairetravailSet).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");        
        });
    } catch (error) {
        httpUtil.sendJson(res, null,  error.status || error.statusCode || 500, error.message);
    }
}

async function deleteHoraireTravail(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const horairetravail = new HoraireTravail(req.body?.idemploye,req.body?.jour,req.body?.heures);
        horairetravail._id = req.body?._id;

        await horairetravail.delete(db).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");        
        });
    } catch (error) {
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}

exports.createHoraireTravail = createHoraireTravail ;
exports.readHoraireTravail = readHoraireTravail;
exports.updateHoraireTravail = updateHoraireTravail;
exports.deleteHoraireTravail = deleteHoraireTravail;