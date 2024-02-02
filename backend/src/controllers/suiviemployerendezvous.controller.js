const { SuiviEmployeRendezvous } = require("../models/suiviemployerendezvous.model");
const { getMongoDBDatabase } = require("../utils/db.util");
const httpUtil = require("../utils/http.util");

async function createSuiviEmployeRendezvous(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const suiviemployerendezvous = new SuiviEmployeRendezvous(null, null, null);
        suiviemployerendezvous.setIdclient(req.body?.idclient);
        suiviemployerendezvous.setIdservice(req.body?.idservice);
        suiviemployerendezvous.setIdemploye(req.body?.idemploye);
        suiviemployerendezvous.setDateheurerendezvous(req.body?.dateheurerendezvous);
        suiviemployerendezvous.setDateheuredebutsuivi(req.body?.dateheuredebutsuivi);
        suiviemployerendezvous.setDateheurefinsuivi(req.body?.dateheurefinsuivi);

        await suiviemployerendezvous.create(db).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");        
        });
    } catch (error) {
        httpUtil.sendJson(res, null, 201, error.message);
    }
}

async function readSuiviEmployeRendezvous(req, res) {
    const db = await getMongoDBDatabase();
    try {
        await new SuiviEmployeRendezvous(req.body?.idemploye, req.body?.dateheuredebutsuivi, req.body?.dateheurefinsuivi).read(db).then((result) => {
            httpUtil.sendJson(res, result, 201, "OK");
        });
    } catch (error) {
        httpUtil.sendJson(res, null, 201, error.message);
    }
}

async function updateSuiviEmployeRendezvous(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const suiviemployerendezvousWhere = new SuiviEmployeRendezvous();
        suiviemployerendezvousWhere._id = req.body?._id;

        const suiviemployerendezvousSet = new SuiviEmployeRendezvous(null, null, req.body?.dateheurefinsuivi);
        suiviemployerendezvousSet.setIdemploye(req.body?.idemploye);
        suiviemployerendezvousSet.setIdclient(req.body?.idclient);
        suiviemployerendezvousSet.setIdservice(req.body?.idservice);
        suiviemployerendezvousSet._state = req.body?._state;

        await suiviemployerendezvousWhere.update(db, suiviemployerendezvousSet).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");        
        });
    } catch (error) {
        httpUtil.sendJson(res, null, 201, error.message);
    }
}

async function deleteSuiviEmployeRendezvous(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const suiviemployerendezvous = new SuiviEmployeRendezvous(req.body?.idemploye, req.body?.dateheuredebutsuivi, req.body?.dateheurefinsuivi);
        suiviemployerendezvous._id = req.body?._id;

        await suiviemployerendezvous.delete(db).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");        
        });
    } catch (error) {
        httpUtil.sendJson(res, null, 201, error.message);
    }
}

exports.createSuiviEmployeRendezvous = createSuiviEmployeRendezvous;
exports.readSuiviEmployeRendezvous = readSuiviEmployeRendezvous;
exports.updateSuiviEmployeRendezvous = updateSuiviEmployeRendezvous;
exports.deleteSuiviEmployeRendezvous = deleteSuiviEmployeRendezvous;