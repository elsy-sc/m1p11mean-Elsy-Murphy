const { Categorieservice } = require("../models/categorieservice.model");
const { getMongoDBDatabase } = require("../utils/db.util");
const httpUtil = require("../utils/http.util");

async function createCategorieservice(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const categorieservice = new Categorieservice(null, req.body?.description, req.body?.idcategorieservice);
        categorieservice.setNom(req.body?.nom);
        categorieservice.create(db).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");        
        });
    } catch (error) {
        httpUtil.sendJson(res, null, 201, error.message);
    }
}

async function readCategorieservice(req, res) {
    const db = await getMongoDBDatabase();
    try {
        new Categorieservice(req.body?.nom, req.body?.description ? { $regex: new RegExp(req.body?.description, 'i')} : null, req.body?.idcategorieservice).read(db).then((result) => {
            httpUtil.sendJson(res, result, 201, "OK");
        });
    } catch (error) {
        httpUtil.sendJson(res, null, 201, error.message);
    }
}

async function updateCategorieservice(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const categorieserviceWhere = new Categorieservice();
        categorieserviceWhere._id = req.body?._id;

        const categorieserviceSet = new Categorieservice(null, req.body?.description, req.body?.idcategorieservice);
        categorieserviceSet.setNom(req.body?.nom);

        categorieserviceWhere.update(db, categorieserviceSet).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");        
        });
    } catch (error) {
        httpUtil.sendJson(res, null, 201, error.message);
    }
}

async function deleteCategorieservice(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const categorieservice = new Categorieservice(req.body?.nom, req.body?.description, req.body?.idcategorieservice);
        categorieservice._id = req.body?._id;

        categorieservice.delete(db).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");        
        });
    } catch (error) {
        httpUtil.sendJson(res, null, 201, error.message);
    }
}

exports.createCategorieservice = createCategorieservice;
exports.readCategorieservice = readCategorieservice;
exports.updateCategorieservice = updateCategorieservice;
exports.deleteCategorieservice = deleteCategorieservice;
