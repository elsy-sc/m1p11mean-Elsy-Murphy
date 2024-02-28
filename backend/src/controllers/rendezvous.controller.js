const { Rendezvous } = require("../models/rendezvous.model");
const { Utilisateur } = require("../models/utilisateur.model");
const { getMongoDBDatabase } = require("../utils/db.util");
const httpUtil = require("../utils/http.util");

async function createRendezvous(req, res) {
    const db = await getMongoDBDatabase();
    let errors = [];
    try {
        const rendezvous = new Rendezvous(null, null, null);
        rendezvous.setIdclient(req.body?.idclient);
        rendezvous.setIdservice(req.body?.idservice);
        rendezvous.setDateheurerendezvous(req.body?.dateheurerendezvous);

        await rendezvous.create(db).then(() => {
            httpUtil.sendJson(res, null, 201, "CREATED");
        });
    } catch (error) {
        if (error.field && error.message) {
            errors.push(error);
        } else if (error.code) {
            let field = error.keyPattern ? Object.keys(error.keyPattern)[0] : null;
            if (field) {
                let error = {
                    field: field,
                    message: field + " existant.",
                };
                errors.push(error);
            }
        }
        httpUtil.sendJson(res, errors, 422, "error");
    }
}

async function readRendezvous(req, res) {
    const db = await getMongoDBDatabase();
    try {
        await new Rendezvous(
            req.body?.idclient,
            req.body?.idservice,
            req.body?.dateheurerendezvous
        )
            .read(db)
            .then((result) => {
                httpUtil.sendJson(res, result, 200);
            });
    } catch (error) {
        httpUtil.sendJson(
            res,
            null,
            error.status || error.statusCode || 500,
            error.message
        );
    }
}


async function updateRendezvous(req, res) {
    const db = await getMongoDBDatabase();
    let errorsUpdate = [];
    try {
        const rendezvousWhere = new Rendezvous();
        rendezvousWhere._id = req.body?._id;

        const rendezvousSet = new Rendezvous(
            null,
            null,
            req.body?.dateheurerendezvous
        );
        rendezvousSet.setIdclient(req.body?.idclient);
        rendezvousSet.setIdservice(req.body?.idservice);

        await rendezvousWhere.update(db, rendezvousSet).then(() => {
            httpUtil.sendJson(res, null, 200, "OK");
        });
    } catch (error) {
        if (error.field && error.message) {
            errorsUpdate.push(error);
        } else if (error.code) {
            let field = error.keyPattern ? Object.keys(error.keyPattern)[0] : null;
            if (field) {
                let error = {
                    field: field,
                    message:
                        field + " déjà utilisée. Veuillez choisir une autre " + field,
                };
                errorsUpdate.push(error);
            }
        }
        httpUtil.sendJson(res, errorsUpdate, 422, "error");
    }
}

async function deleteRendezvous(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const rendezvous = new Rendezvous(
            req.body?.idclient,
            req.body?.idservice,
            req.body?.dateheurerendezvous
        );
        rendezvous._id = req.body?._id;

        await rendezvous.delete(db).then(() => {
            httpUtil.sendJson(res, null, 200, "OK");
        });
    } catch (error) {
        httpUtil.sendJson(
            res,
            null,
            error.status || error.statusCode || 500,
            error.message
        );
    }
}

async function nombreRendezVousParMois(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const rendezvous = new Rendezvous();

        let addFields = {
            convertedDate: {
                $dateFromString: {
                    dateString: "$dateheurerendezvous",
                    format: "%Y-%m-%d %H:%M:%S"
                }
            }
        }

        let query = {
            $and: [
                { _state: 1 },
                {
                    $expr: {
                        $eq: [{ $year: '$convertedDate' },
                        parseInt(req.body?.annee)
                        ]
                    }
                }
            ]
        };

        let grouby = {
            _id: { $month: '$convertedDate' },
            nombrereservation: { $sum: 1 }
        }

        rendezvous.readWithAddFieldAndGroupBy(db, query, grouby, addFields, null).then(
            (result) => {
                httpUtil.sendJson(res, result, 200, "ok");
            }
        );
    } catch (error) {
        console.error(error);
    }
}

async function nombrenombreRendezVousParJour(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const rendezvous = new Rendezvous();

        let addFields = {
            convertedDate: {
                $dateFromString: {
                    dateString: "$dateheurerendezvous",
                    format: "%Y-%m-%d %H:%M:%S"
                }
            }
        }

        let query = {
            $and: [
                { _state: 1 },
                {
                    convertedDate: {
                        $gte: new Date(req.body.debut + "T00:00:00Z"),
                        $lte: new Date(req.body.fin + "T23:59:59Z")
                    }
                }
            ]
        };

        let grouby = {
            _id: {
                $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$convertedDate"
                }
            },
            nombrereservation: { $sum: 1 }
        }

        rendezvous.readWithAddFieldAndGroupBy(db, query, grouby, addFields, null).then(
            (result) => {
                httpUtil.sendJson(res, result, 200, "ok");
            }
        );

    } catch (error) {
        console.error(error);
    }
}

async function beneficeNetParMois(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const rendezvous = new Rendezvous();

        const aggregate = [
            {
                $addFields: {
                    dateConvertie: {
                        $dateFromString: {
                            dateString: "$dateheurerendezvous",
                            format: "%Y-%m-%d %H:%M:%S"
                        }
                    }
                }
            },
            {
                $match: {
                    $and: [
                        { _state: 1 },
                        {
                            $expr: {
                                $eq: [{ $year: '$dateConvertie' }, parseInt(req.body?.annee)]
                            }
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "service",
                    localField: "idservice",
                    foreignField: "_id",
                    as: "service"
                }
            },
            {
                $unwind: "$service"
            },
            {
                $project: {
                    month: { $month: "$dateConvertie" },
                    prix: { $toInt: "$service.prix" },
                    poucentageCommission: { $ifNull: [{ $toDouble: "$service.commission" }, 0] },
                    commission: {
                        $multiply: [
                            { $toInt: "$service.prix" },
                            {
                                $divide: [
                                    { $ifNull: [{ $toDouble: "$service.commission" }, 0] },
                                    100
                                ]
                            }
                        ]
                    }
                }
            },
            {
                $project: {
                    month: 1,
                    totalPrice: { $subtract: ["$prix", "$commission"] }
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$totalPrice" }
                }
            }
        ];

        rendezvous.readWithAggregate(db, aggregate).then(
            (result) => {
                httpUtil.sendJson(res, result, 200, "ok");
            }
        );
    } catch (error) {
        console.error(error);
    }
}

async function beneficeNetParJour(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const rendezvous = new Rendezvous();

        const aggregate = [
            {
                $addFields: {
                    dateConvertie: {
                        $dateFromString: {
                            dateString: "$dateheurerendezvous",
                            format: "%Y-%m-%d %H:%M:%S"
                        }
                    }
                }
            },
            {
                $match: {
                    $and: [
                        { _state: 1 },
                        {
                            dateConvertie: {
                                $gte: new Date(req.body.debut + "T00:00:00Z"),
                                $lte: new Date(req.body.fin + "T23:59:59Z")
                            }
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "service",
                    localField: "idservice",
                    foreignField: "_id",
                    as: "service"
                }
            },
            {
                $unwind: "$service"
            },
            {
                $project: {
                    date: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$dateConvertie"
                        }
                    },
                    prix: { $toInt: "$service.prix" },
                    poucentageCommission: { $ifNull: [{ $toDouble: "$service.commission" }, 0] },
                    commission: {
                        $multiply: [
                            { $toInt: "$service.prix" },
                            {
                                $divide: [
                                    { $ifNull: [{ $toDouble: "$service.commission" }, 0] },
                                    100
                                ]
                            }
                        ]
                    }
                }
            },
            {
                $project: {
                    date: 1,
                    totalPrice: { $subtract: ["$prix", "$commission"] }
                }
            },
            {
                $group: {
                    _id: "$date",
                    total: { $sum: "$totalPrice" }
                }
            }
        ];

        rendezvous.readWithAggregate(db, aggregate).then(
            (result) => {
                httpUtil.sendJson(res, result, 200, "ok");
            }
        );
    } catch (error) {
        console.error(error);
    }
}

async function rappelRendezvous(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const utilisateur = new Utilisateur(req.body?.nom, req.body?.prenom, req.body?.email, req.body?.datenaissance, req.body?.numerotelephone, req.body?.motdepasse, req.body?.role);
        utilisateur._id = req.body?._id;
        let rendezvousReminder = await Rendezvous.checkAndSendReminders(db, utilisateur); 
        httpUtil.sendJson(res, rendezvousReminder, 200, "OK");
    } catch (error) {
        httpUtil.sendJson(
            res,
            null,
            error.status || error.statusCode || 500,
            error.message
        );
    }
}

async function sendMailRappel(req, res) {
    const db = await getMongoDBDatabase();
    try {
        Rendezvous.sendMailReminder(req.body.appointment, req.body.client);
        httpUtil.sendJson(res, null, 200, "OK");
    } catch (error) {
        httpUtil.sendJson(
            res,
            null,
            error.status || error.statusCode || 500,
            error.message
        );
    }
}

exports.createRendezvous = createRendezvous;
exports.readRendezvous = readRendezvous;
exports.updateRendezvous = updateRendezvous;
exports.deleteRendezvous = deleteRendezvous;
exports.nombreRendezVousParMois = nombreRendezVousParMois;
exports.nombrenombreRendezVousParJour = nombrenombreRendezVousParJour;
exports.beneficeNetParMois = beneficeNetParMois;
exports.beneficeNetParJour = beneficeNetParJour;
exports.rappelRendezvous = rappelRendezvous;
exports.sendMailRappel = sendMailRappel;