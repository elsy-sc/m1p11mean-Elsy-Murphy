const { Service } = require("../models/service.model");
const { getMongoDBDatabase } = require("../utils/db.util");
const httpUtil = require("../utils/http.util");

async function createService(req, res) {
    const db = await getMongoDBDatabase();
    let errors = [];
    try {
        const service = new Service(null, null, req.body?.description, null, null, req.body?.commission);
        service.setIdcategorieservice(req.body?.idcategorieservice);
        service.setNom(req.body?.nom);
        service.setPrix(req.body?.prix);
        service.setDuree(req.body?.duree);
        await service.create(db).then(() => {
            httpUtil.sendJson(res, [service], 201, "OK");        
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

async function readService(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const service = new Service(req.body?.idcategorieservice, req.body?.nom ? { $regex: new RegExp(req.body?.nom, 'i')} : null, req.body?.description ? { $regex: new RegExp(req.body?.description, 'i')} : null, req.body?.duree, req.body?.prix, req.body?.commission);
        service._id = req.body?._id;
        await service.read(db).then((result) => {
            httpUtil.sendJson(res, result, 201, "OK");
        });
    } catch (error) {
        httpUtil.sendJson(res, null, 201, error.message);
    }
}

async function updateService(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const serviceWhere = new Service();
        serviceWhere._id = req.body?._id;

        const serviceSet = new Service(null, null, req.body?.description, null, null, req.body?.commission);
        serviceSet.setIdcategorieservice(req.body?.idcategorieservice);
        serviceSet.setNom(req.body?.nom);
        serviceSet.setPrix(req.body?.prix);
        serviceSet.setDuree(req.body?.duree);

        await serviceWhere.update(db, serviceSet).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");        
        });
    } catch (error) {
        httpUtil.sendJson(res, null, 201, error.message);
    }
}

async function deleteService(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const service = new Service(req.body?.idcategorieservice, req.body?.nom, req.body?.description, req.body?.duree, req.body?.prix, req.body?.commission);
        service._id = req.body?._id;

        await service.delete(db).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");        
        });
    } catch (error) {
        httpUtil.sendJson(res, null, 201, error.message);
    }
}

exports.createService = createService;
exports.readService = readService;
exports.updateService = updateService;
exports.deleteService = deleteService;