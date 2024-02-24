const { Categorieservice } = require("../models/categorieservice.model");
const { getMongoDBDatabase } = require("../utils/db.util");
const httpUtil = require("../utils/http.util");

async function createCategorieservice(req, res) {
    const db = await getMongoDBDatabase();
    let errors = [];
    try {
        const categorieservice = new Categorieservice(null, req.body?.description, req.body?.idcategorieservice);
        categorieservice.setNom(req.body?.nom);
        await categorieservice.create(db).then(() => {
            httpUtil.sendJson(res, [categorieservice], 201, "CREATED");        
        });
    } catch (error) {
        if (error.field && error.message) {
            errors.push(error);
        }
        else if (error.code) {
            let field  = error.keyPattern ? Object.keys(error.keyPattern)[0] : null;
            if (field) {
                let error = {
                    field: field,
                    message: field + " existant."
                }
                errors.push(error);
            }
        }
        httpUtil.sendJson(res, errors, 422, "error");
    }
}

async function readCategorieservice(req, res) {
    const db = await getMongoDBDatabase();
    try {
        await new Categorieservice(req.body?.nom ? { $regex: new RegExp(req.body?.nom, 'i')} : null, req.body?.description ? { $regex: new RegExp(req.body?.description, 'i')} : null, req.body?.idcategorieservice).read(db).then((result) => {
            httpUtil.sendJson(res, result, 200);
        });
    } catch (error) {
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}

async function updateCategorieservice(req, res) {
    const db = await getMongoDBDatabase();
    let errorsUpdate = [];
    try {
        const categorieserviceWhere = new Categorieservice();
        categorieserviceWhere._id = req.body?._id;

        const categorieserviceSet = new Categorieservice(null, req.body?.description, req.body?.idcategorieservice);
        categorieserviceSet.setNom(req.body?.nom);

        await categorieserviceWhere.update(db, categorieserviceSet).then(() => {
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
                    message: field+" existant."
                }
                errorsUpdate.push(error);
            }
        }
        httpUtil.sendJson(res, errorsUpdate, 422, "error");
    }
}

async function deleteCategorieservice(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const categorieservice = new Categorieservice(req.body?.nom, req.body?.description, req.body?.idcategorieservice);
        categorieservice._id = req.body?._id;

        await categorieservice.delete(db).then(() => {
            httpUtil.sendJson(res, null, 200, "OK");        
        });
    } catch (error) {
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}

exports.createCategorieservice = createCategorieservice;
exports.readCategorieservice = readCategorieservice;
exports.updateCategorieservice = updateCategorieservice;
exports.deleteCategorieservice = deleteCategorieservice;
