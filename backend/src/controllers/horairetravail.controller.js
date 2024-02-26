const { HoraireTravail } = require("../models/horairetravail.model");
const { getMongoDBDatabase } = require("../utils/db.util");
const httpUtil = require("../utils/http.util");

async function createHoraireTravail(req, res) {
    const db = await getMongoDBDatabase();
    try {
        let horairetravail = new HoraireTravail(null, null, null);
        let horairetravailWhere = new HoraireTravail();

        horairetravail.setIdEmploye(req.body?.idemploye);
        horairetravail.setJour(req.body?.jour);
        
        let readResult = await horairetravail.read(db,null,null);
        if (readResult.length != 0) {
            horairetravail = readResult[0];
            horairetravailWhere._state = readResult[0]._state;
        } 
        horairetravail.heures = req.body?.heures;
        horairetravail._state = 1;

        if (horairetravail._id != undefined) {
            horairetravailWhere._id = horairetravail._id;

            delete horairetravail.Employe;

            await horairetravailWhere.update(db, horairetravail);
            httpUtil.sendJson(res, null, 201, "Created");
        } else {
            await horairetravail.create(db);
            httpUtil.sendJson(res, null, 200, "Created");
        }

    } catch (error) {
        console.error(error);
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}

async function readHoraireTravail(req, res) {
    const db = await getMongoDBDatabase();
    try {
        await new HoraireTravail(req.body?.idemploye, req.body?.jour, req.body?.heures).read(db).then((result) => {
            httpUtil.sendJson(res, result, 200, "OK");
        });
    } catch (error) {
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}

async function updateHoraireTravail(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const horairetravailWhere = new HoraireTravail();
        horairetravailWhere._id = req.body?._id;

        const horairetravailSet = new HoraireTravail(null, null, null);
        horairetravailSet.setIdEmploye(req.body?.idemploye);
        horairetravailSet.setJour(req.body?.jour);
        horairetravailSet.setHeures(req.body?.heures);

        await horairetravailWhere.update(db, horairetravailSet).then(() => {
            httpUtil.sendJson(res, null, 200, "OK");
        });
    } catch (error) {
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}

async function deleteHoraireTravail(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const horairetravail = new HoraireTravail(req.body?.idemploye, req.body?.jour, req.body?.heures);
        horairetravail._id = req.body?._id;

        await horairetravail.delete(db).then(() => {
            httpUtil.sendJson(res, null, 200, "OK");
        });
    } catch (error) {
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}

exports.createHoraireTravail = createHoraireTravail;
exports.readHoraireTravail = readHoraireTravail;
exports.updateHoraireTravail = updateHoraireTravail;
exports.deleteHoraireTravail = deleteHoraireTravail;