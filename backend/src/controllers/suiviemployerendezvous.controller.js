const { Date } = require("../beans/date.bean.util");
const { Employe } = require("../models/employe.model");
const { HoraireTravail } = require("../models/horairetravail.model");
const { Rendezvous } = require("../models/rendezvous.model");
const { Service } = require("../models/service.model");
const { SuiviEmployeRendezvous } = require("../models/suiviemployerendezvous.model");
const { getMongoDBDatabase } = require("../utils/db.util");
const httpUtil = require("../utils/http.util");
const moment = require("moment");

async function createSuiviEmployeRendezvous(req, res) {
    const db = await getMongoDBDatabase();
    let errors = [];
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

async function readSuiviEmployeRendezvous(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const suiviemployerendezvous = new SuiviEmployeRendezvous(req.body?.idemploye, req.body?.dateheuredebutsuivi, req.body?.dateheurefinsuivi);
        suiviemployerendezvous.idclient = req.body?.idclient;
        await suiviemployerendezvous.read(db).then((result) => {
            httpUtil.sendJson(res, result, 200, "OK");
        });
    } catch (error) {
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}

async function updateSuiviEmployeRendezvous(req, res) {
    const db = await getMongoDBDatabase();
    let errorsUpdate = [];
    try {
        const suiviemployerendezvousWhere = new SuiviEmployeRendezvous();
        suiviemployerendezvousWhere._id = req.body?._id;

        const suiviemployerendezvousSet = new SuiviEmployeRendezvous(null, req.body.dateheuredebutsuivi, req.body?.dateheurefinsuivi, req.body?.dateheurevalidation);
        suiviemployerendezvousSet.setIdemploye(req.body?.idemploye);
        suiviemployerendezvousSet.setIdclient(req.body?.idclient);
        suiviemployerendezvousSet.setIdservice(req.body?.idservice);
        suiviemployerendezvousSet._state = req.body?._state;

        await suiviemployerendezvousWhere.update(db, suiviemployerendezvousSet).then(() => {
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

async function deleteSuiviEmployeRendezvous(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const suiviemployerendezvous = new SuiviEmployeRendezvous(req.body?.idemploye, req.body?.dateheuredebutsuivi, req.body?.dateheurefinsuivi);
        suiviemployerendezvous._id = req.body?._id;

        await suiviemployerendezvous.delete(db).then(() => {
            httpUtil.sendJson(res, null, 200, "OK");        
        });
    } catch (error) {
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);    
    }
}

async function prendreEmployeDisponible(req, res) {
    const db = await getMongoDBDatabase();
    try {
        let employeDisponibilite = await Employe.getEmployeDisponible(db, new Date(req.body?.dateheurerendezvous).date);
        return httpUtil.sendJson(res, employeDisponibilite, 200, "OK");
    } catch (error) {
        return httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}

async function prendreRendezvous(req, res) {
    const db = await getMongoDBDatabase();
    let responseSent = false; 
    try {
      const rendezvous = new SuiviEmployeRendezvous(
        req.body?.idemploye);
        rendezvous.setIdclient(req.body?.idclient);
        rendezvous.setIdservice(req.body?.idservice);
        rendezvous.dateheurerendezvous = (req.body?.dateheurerendezvous ? new Date(req.body?.dateheurerendezvous).date : undefined);
        rendezvous.idemploye = req.body?.idemploye;
        
        if (rendezvous.dateheurerendezvous != null) {
            let employeDisponibilite = await Employe.getEmployeDisponible(db, rendezvous.dateheurerendezvous);
            let service = new Service();
            service._id = req.body?.idservice;
            service = (await service.read(db))[0];

            if (rendezvous.idemploye == null) {
                responseSent = true;
                return httpUtil.sendJson(res, null, 401, "Employé obligatoire");
            }

            else if (employeDisponibilite.length == 0) {
                if (!responseSent) {
                    responseSent = true;
                    return httpUtil.sendJson(res, null, 401, "Employé non disponible");
                }
            }

            else {
                for (let i = 0; i < employeDisponibilite.length; i++) {                      
                    if (employeDisponibilite[i][0]._id == rendezvous.idemploye) {
                        let datefinheurerendezvous = moment(rendezvous.dateheurerendezvous).add(service.duree, "hours").format("YYYY-MM-DD HH:mm");
                        let dateheuredebutrendezvousHeure = moment(rendezvous.dateheurerendezvous).format("HH:mm");
                        let datefinheurerendezvousHeure = moment(datefinheurerendezvous).format("HH:mm");
        
                        let horaireTravail = new HoraireTravail();
                        horaireTravail.idemploye = employeDisponibilite[i]._id;
                        let result = await horaireTravail.read(db, {
                            $and: [
                            { jour: moment(rendezvous.dateheurerendezvous).day() },
                            {
                                $or: [
                                {
                                    heures: {
                                    $elemMatch: {
                                        debut: { $lte: dateheuredebutrendezvousHeure },
                                        fin: { $gte: datefinheurerendezvousHeure }, 
                                    },
                                    },
                                },
                                {
                                    heures: {
                                    $elemMatch: {
                                        debut: { $lte: dateheuredebutrendezvousHeure },
                                        fin: { $gte: datefinheurerendezvousHeure },
                                    },
                                    },
                                },
                                ],
                            }],
                        }); 
                        if (result.length > 0) {
                            await rendezvous.create(db).then(() => {
                                if (!responseSent) {
                                    responseSent = true;
                                    return httpUtil.sendJson(res, null, 201, "OK");
                                }
                            });
                        }  
                    }
                }
                if (!responseSent) {
                    responseSent = true;
                    return httpUtil.sendJson(res, null, 401, "Employé non disponible");
                }
            }
        }
        else {
            if (!responseSent) {
                responseSent = true;
                return httpUtil.sendJson(res, null, 401, "Date de rendez-vous obligatoire");
            }
        }
    } catch (error) {
        if (!responseSent) {
            responseSent = true;
            return httpUtil.sendJson(
              res,
              null,
              error.status || error.statusCode || 500,
              error.message
            );
        }
    }
}
  

exports.createSuiviEmployeRendezvous = createSuiviEmployeRendezvous;
exports.readSuiviEmployeRendezvous = readSuiviEmployeRendezvous;
exports.updateSuiviEmployeRendezvous = updateSuiviEmployeRendezvous;
exports.deleteSuiviEmployeRendezvous = deleteSuiviEmployeRendezvous;
exports.prendreRendezvous = prendreRendezvous;
exports.prendreEmployeDisponible = prendreEmployeDisponible;