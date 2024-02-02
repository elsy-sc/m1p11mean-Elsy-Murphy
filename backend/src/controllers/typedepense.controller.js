const { TypeDepense } = require("../models/typedepense.model");
const { getMongoDBDatabase } = require("../utils/db.util");
const httpUtil = require("../utils/http.util");

async function createTypeDepense(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const typedepense = new TypeDepense(null,req.body?.description);
        typedepense.setNom(req.body?.nom);
        await typedepense.create(db).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");        
        });
    } catch (error) {
        httpUtil.sendJson(res, null, 201, error.message);
    }
}

async function readTypeDepense(req, res) {
    const db = await getMongoDBDatabase();
    try {
        await new TypeDepense(req.body?.nom ? { $regex: new RegExp(req.body?.nom, 'i')} : null, req.body?.description ? { $regex: new RegExp(req.body?.description, 'i')} : null).read(db).then((result) => {
            httpUtil.sendJson(res, result, 201, "OK");
        });
    } catch (error) {
        httpUtil.sendJson(res, null, 201, error.message);
    }
}

async function updateTypeDepense(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const typedepenseWhere = new TypeDepense();
        typedepenseWhere._id = req.body?._id;

        const typedepenseSet = new TypeDepense(null, req.body?.description);
        typedepenseSet.setNom(req.body?.nom);

        await typedepenseWhere.update(db, typedepenseSet).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");        
        });
    } catch (error) {
        httpUtil.sendJson(res, null, 201, error.message);
    }
}

async function deleteTypeDepense(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const typedepense = new TypeDepense(req.body?.nom, req.body?.description);
        typedepense._id = req.body?._id;

        await typedepense.delete(db).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");        
        });
    } catch (error) {
        httpUtil.sendJson(res, null, 201, error.message);
    }
}

exports.createTypeDepense = createTypeDepense;
exports.readTypeDepense = readTypeDepense;
exports.updateTypeDepense = updateTypeDepense;
exports.deleteTypeDepense = deleteTypeDepense;
