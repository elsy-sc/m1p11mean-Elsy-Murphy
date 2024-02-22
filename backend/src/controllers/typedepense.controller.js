const { TypeDepense } = require("../models/typedepense.model");
const { getMongoDBDatabase } = require("../utils/db.util");
const httpUtil = require("../utils/http.util");

async function createTypeDepense(req, res) {
    const db = await getMongoDBDatabase();
    let errors = [];
    try {
        const typedepense = new TypeDepense(null, req.body?.description);
        typedepense.setNom(req.body?.nom);
        await typedepense.create(db).then(() => {
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

async function readTypeDepense(req, res) {
    const db = await getMongoDBDatabase();
    try {
        await new TypeDepense(req.body?.nom ? { $regex: new RegExp(req.body?.nom, 'i') } : null, req.body?.description ? { $regex: new RegExp(req.body?.description, 'i') } : null).read(db).then((result) => {
            httpUtil.sendJson(res, result, 200, "OK");
        });
    } catch (error) {
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}

async function updateTypeDepense(req, res) {
    const db = await getMongoDBDatabase();
    let errorsUpdate = [];

    try {
        const typedepenseWhere = new TypeDepense();
        typedepenseWhere._id = req.body?._id;

        const typedepenseSet = new TypeDepense(null, req.body?.description);
        typedepenseSet.setNom(req.body?.nom);

        await typedepenseWhere.update(db, typedepenseSet).then(() => {
            httpUtil.sendJson(res, null, 200, "OK");
        });
    } catch (error) {
        if (error.field && error.message) {
            errorsUpdate.push(error);
        } 
        else if (error.code) {
            let field  = error.keyPattern ? Object.keys(error.keyPattern)[0] : null;
            if (field) {
                let error = {
                    field: field,
                    message: field+" déjà utilisée. Veuillez choisir une autre "+field
                }
                errorsUpdate.push(error);
            }
        }
        httpUtil.sendJson(res, errorsUpdate, 422, "error");
        httpUtil.sendJson(res, errors, 422, "error");
    }
}

async function deleteTypeDepense(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const typedepense = new TypeDepense(req.body?.nom, req.body?.description);
        typedepense._id = req.body?._id;

        await typedepense.delete(db).then(() => {
            httpUtil.sendJson(res, null, 200, "OK");
        });
    } catch (error) {
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}

exports.createTypeDepense = createTypeDepense;
exports.readTypeDepense = readTypeDepense;
exports.updateTypeDepense = updateTypeDepense;
exports.deleteTypeDepense = deleteTypeDepense;
