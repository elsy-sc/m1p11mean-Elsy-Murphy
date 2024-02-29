const { Offrespeciale } = require('../models/offrespeciale.model');
const { getMongoDBDatabase } = require('../utils/db.util');
const httpUtil = require('../utils/http.util');

async function createOffrespeciale(req, res, next) {
    const db = await getMongoDBDatabase();
    let errors = [];
    try {
        const offrespecialeBody = JSON.parse(req.body?.offrespeciale || "{}");
        const offrespeciale = new Offrespeciale();
        offrespeciale.setDescriptionoffrespeciale(offrespecialeBody?.descriptionoffrespeciale);
        offrespeciale.setDateheuredebutoffrespeciale(offrespecialeBody?.dateheuredebutoffrespeciale);
        offrespeciale.setDateheurefinoffrespeciale(offrespecialeBody?.dateheurefinoffrespeciale);
        offrespeciale.setReductionoffrespeciale(offrespecialeBody?.reductionoffrespeciale);
        offrespeciale.setNom(offrespecialeBody?.nom);
        offrespeciale.setPrix(offrespecialeBody?.prix);
        offrespeciale.setDuree(offrespecialeBody?.duree);
        offrespeciale.setIdcategorieservice(offrespecialeBody?.idcategorieservice);
        offrespeciale.image = req.body?.imageDB;

        await offrespeciale.create(db).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");        
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

async function readOffrespeciale(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const offrespeciale = new Offrespeciale(null, null, null, null, null, req.body?.idcategorieservice, req.body?.nom, req.body?.description, null, null, null);
        if (offrespeciale.nom) {
            offrespeciale.nom = { $regex: offrespeciale.nom, $options: 'i' };
        }
        await offrespeciale.read(db).then((result) => {
            httpUtil.sendJson(res, result, 200, "OK");
        });
    } catch (error) {
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}

async function updateOffrespeciale(req, res, next) {
    const db = await getMongoDBDatabase();
    let errorsUpdate = [];
    try {
        const offrespecialeBody = JSON.parse(req.body?.offrespeciale|| "{}");
        const offrespecialeWhere = new Offrespeciale();
        offrespecialeWhere._id = offrespecialeBody?._id;
        
        const offrespecialeSet = new Offrespeciale(null, offrespecialeBody?.descriptionoffrespeciale, offrespecialeBody?.idoffrespeciale);
        offrespecialeSet.setDescriptionoffrespeciale(offrespecialeBody?.descriptionoffrespeciale);
        offrespecialeSet.setDateheuredebutoffrespeciale(offrespecialeBody?.dateheuredebutoffrespeciale);
        offrespecialeSet.setDateheurefinoffrespeciale(offrespecialeBody?.dateheurefinoffrespeciale);
        offrespecialeSet.setReductionoffrespeciale(offrespecialeBody?.reductionoffrespeciale);
        offrespecialeSet.setNom(offrespecialeBody?.nom);
        offrespecialeSet.setPrix(offrespecialeBody?.prix);
        offrespecialeSet.setDuree(offrespecialeBody?.duree);
        offrespecialeSet.setIdcategorieservice(offrespecialeBody?.idcategorieservice);
        offrespecialeSet._state = offrespecialeBody?._state;
        offrespecialeSet.image = req.body?.imageDB;

        await offrespecialeWhere.update(db, offrespecialeSet).then(() => {
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
    }
}

async function deleteOffrespeciale(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const offrespeciale = new Offrespeciale(req.body?.descriptionoffrespeciale, req.body?.idoffrespeciale);
        offrespeciale._id = req.body?._id;

        await offrespeciale.delete(db).then(() => {
            httpUtil.sendJson(res, null, 200, "OK");        
        });
    } catch (error) {
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}

exports.createOffrespeciale = createOffrespeciale;
exports.readOffrespeciale = readOffrespeciale;
exports.updateOffrespeciale = updateOffrespeciale;
exports.deleteOffrespeciale = deleteOffrespeciale;