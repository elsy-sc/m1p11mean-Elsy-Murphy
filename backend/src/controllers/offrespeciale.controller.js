const { Offrespeciale } = require('../models/offrespeciale.model');
const { getMongoDBDatabase } = require('../utils/db.util');
const httpUtil = require('../utils/http.util');

async function createOffrespeciale(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const offrespeciale = new Offrespeciale();
        offrespeciale.setDescriptionoffrespeciale(req.body?.descriptionoffrespeciale);
        offrespeciale.setDateheuredebutoffrespeciale(req.body?.dateheuredebutoffrespeciale);
        offrespeciale.setDateheurefinoffrespeciale(req.body?.dateheurefinoffrespeciale);
        offrespeciale.setReductionoffrespeciale(req.body?.reductionoffrespeciale);
        offrespeciale.setNom(req.body?.nom);
        offrespeciale.setPrix(req.body?.prix);
        offrespeciale.setDuree(req.body?.duree);
        offrespeciale.setIdcategorieservice(req.body?.idcategorieservice);
        await offrespeciale.create(db).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");        
        });
    } catch (error) {
        httpUtil.sendJson(res, null, 201, error.message);
    }
}

async function readOffrespeciale(req, res) {
    const db = await getMongoDBDatabase();
    try {
        await new Offrespeciale(req.body?.descriptionoffrespeciale ? { $regex: new RegExp(req.body?.descriptionoffrespeciale, 'i')} : null).read(db).then((result) => {
            httpUtil.sendJson(res, result, 201, "OK");
        });
    } catch (error) {
        httpUtil.sendJson(res, null, 201, error.message);
    }
}

async function updateOffrespeciale(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const offrespecialeWhere = new Offrespeciale();
        offrespecialeWhere._id = req.body?._id;

        const offrespecialeSet = new Offrespeciale(null, req.body?.descriptionoffrespeciale, req.body?.idoffrespeciale);
        offrespecialeSet.setDescriptionoffrespeciale(req.body?.descriptionoffrespeciale);
        offrespecialeSet.setDateheuredebutoffrespeciale(req.body?.dateheuredebutoffrespeciale);
        offrespecialeSet.setDateheurefinoffrespeciale(req.body?.dateheurefinoffrespeciale);
        offrespecialeSet.setReductionoffrespeciale(req.body?.reductionoffrespeciale);
        offrespecialeSet.setNom(req.body?.nom);
        offrespecialeSet.setPrix(req.body?.prix);
        offrespecialeSet.setDuree(req.body?.duree);
        offrespecialeSet.setIdcategorieservice(req.body?.idcategorieservice);
        offrespecialeSet._state = req.body?._state;

        await offrespecialeWhere.update(db, offrespecialeSet).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");        
        });
    } catch (error) {
        httpUtil.sendJson(res, null, 201, error.message);
    }
}

async function deleteOffrespeciale(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const offrespeciale = new Offrespeciale(req.body?.descriptionoffrespeciale, req.body?.idoffrespeciale);
        offrespeciale._id = req.body?._id;

        await offrespeciale.delete(db).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");        
        });
    } catch (error) {
        httpUtil.sendJson(res, null, 201, error.message);
    }
}

exports.createOffrespeciale = createOffrespeciale;
exports.readOffrespeciale = readOffrespeciale;
exports.updateOffrespeciale = updateOffrespeciale;
exports.deleteOffrespeciale = deleteOffrespeciale;