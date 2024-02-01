const { Rendezvous } = require("../models/rendezvous.model");
const { getMongoDBDatabase } = require("../utils/db.util");
const httpUtil = require("../utils/http.util");

async function createRendezvous(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const rendezvous = new Rendezvous(null, null, req.body?.dateheurerendezvous);
        rendezvous.setIdclient(req.body?.idclient);
        rendezvous.setIdservice(req.body?.idservice);

        await rendezvous.create(db).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");        
        });
    } catch (error) {
        httpUtil.sendJson(res, null, 201, error.message);
    }
}

async function readRendezvous(req, res) {
    const db = await getMongoDBDatabase();
    try {
        await new Rendezvous(req.body?.idclient, req.body?.idservice, req.body?.dateheurerendezvous).read(db).then((result) => {
            httpUtil.sendJson(res, result, 201, "OK");
        });
    } catch (error) {
        httpUtil.sendJson(res, null, 201, error.message);
    }
}

async function updateRendezvous(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const rendezvousWhere = new Rendezvous();
        rendezvousWhere._id = req.body?._id;

        const rendezvousSet = new Rendezvous(null, null, req.body?.dateheurerendezvous);
        rendezvousSet.setIdclient(req.body?.idclient);
        rendezvousSet.setIdservice(req.body?.idservice);

        await rendezvousWhere.update(db, rendezvousSet).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");        
        });
    } catch (error) {
        httpUtil.sendJson(res, null, 201, error.message);
    }
}

async function deleteRendezvous(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const rendezvous = new Rendezvous(req.body?.idclient, req.body?.idservice, req.body?.dateheurerendezvous);
        rendezvous._id = req.body?._id;

        await rendezvous.delete(db).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");        
        });
    } catch (error) {
        httpUtil.sendJson(res, null, 201, error.message);
    }
}

exports.createRendezvous = createRendezvous;
exports.readRendezvous = readRendezvous;
exports.updateRendezvous = updateRendezvous;
exports.deleteRendezvous = deleteRendezvous;