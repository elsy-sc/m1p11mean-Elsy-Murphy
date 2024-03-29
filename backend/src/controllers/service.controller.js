const { Service } = require("../models/service.model");
const { getMongoDBDatabase } = require("../utils/db.util");
const httpUtil = require("../utils/http.util");

async function createService(req, res, next) {
    const db = await getMongoDBDatabase();
    let errors = [];
    try {        
        const serviceBody = JSON.parse(req.body?.service|| "{}");
        const service = new Service(null, null, serviceBody.description, null, null, serviceBody.commission);
        service.setIdcategorieservice(serviceBody.idcategorieservice);
        service.setNom(serviceBody.nom);
        service.setPrix(serviceBody.prix);
        service.setDuree(serviceBody.duree);
        service.image = req.body?.imageDB;
        await service.create(db).then(() => {
            httpUtil.sendJson(res, [service], 201, "OK");        
        });
    } catch (error) {
        console.log(error)
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
            httpUtil.sendJson(res, result, 200, "OK");
        });
    } catch (error) {
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}

async function updateService(req, res, next) {
    const db = await getMongoDBDatabase();
    let errorsUpdate = [];
    try {
        const serviceBody = JSON.parse(req.body?.service|| "{}");
        const serviceWhere = new Service();
        serviceWhere._id = serviceBody?._id;

        const serviceSet = new Service(null, null, serviceBody?.description, null, null, serviceBody?.commission);
        serviceSet.setIdcategorieservice(serviceBody?.idcategorieservice);
        serviceSet.setNom(serviceBody?.nom);
        serviceSet.setPrix(serviceBody?.prix);
        serviceSet.setDuree(serviceBody?.duree);
        serviceSet.image = req.body?.imageDB;

        await serviceWhere.update(db, serviceSet).then(() => {
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
                    message: field + " existant."
                }
                errorsUpdate.push(error);
            }
        }
        httpUtil.sendJson(res, errorsUpdate, 422, "error");
    }
}

async function deleteService(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const service = new Service(req.body?.idcategorieservice, req.body?.nom, req.body?.description, req.body?.duree, req.body?.prix, req.body?.commission);
        service._id = req.body?._id;

        await service.delete(db).then(() => {
            httpUtil.sendJson(res, null, 200, "OK");        
        });
    } catch (error) {
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}

exports.createService = createService;
exports.readService = readService;
exports.updateService = updateService;
exports.deleteService = deleteService;