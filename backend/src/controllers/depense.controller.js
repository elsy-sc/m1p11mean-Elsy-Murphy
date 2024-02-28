const { Depense } = require("../models/depense.model");
const { getMongoDBDatabase } = require("../utils/db.util");
const httpUtil = require("../utils/http.util");

async function createDepense(req, res) {
    const db = await getMongoDBDatabase();
    let errors = [];

    try {
        const depense = new Depense(null, null, null, null);
        depense.setIdTypeDepense(req.body?.idtypedepense);
        depense.setMontant(req.body?.montant);
        depense.setDescription(req.body?.description);
        depense.setDateDepense(req.body?.datedepense);

        await depense.create(db).then(() => {
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

async function readDepense(req, res) {
    const db = await getMongoDBDatabase();
    try {
        await new Depense(req.body?.idtypedepense, req.body?.montant, req.body?.description ? { $regex: new RegExp(req.body?.description, 'i') } : null, req.body?.datedepense ? { $regex: new RegExp(req.body?.datedepense, 'i') } : null).read(db).then((result) => {
            httpUtil.sendJson(res, result, 200, "OK");
        });
    } catch (error) {
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}

async function updateDepense(req, res) {
    const db = await getMongoDBDatabase();
    let errorsUpdate = [];

    try {
        const depenseWhere = new Depense();
        depenseWhere._id = req.body?._id;

        const depenseSet = new Depense();
        depenseSet.setIdTypeDepense(req.body?.idtypedepense);
        depenseSet.setDescription(req.body?.description);
        depenseSet.setMontant(req.body?.montant);
        depenseSet.setDateDepense(req.body?.datedepense);

        await depenseWhere.update(db, depenseSet).then(() => {
            httpUtil.sendJson(res, null, 200, "OK");
        });
    } catch (error) {
        if (error.field && error.message) {
            errorsUpdate.push(error);
        }
        else if (error.code) {
            let field = error.keyPattern ? Object.keys(error.keyPattern)[0] : null;
            if (field) {
                let error = {
                    field: field,
                    message: field + " déjà utilisée. Veuillez choisir une autre " + field
                }
                errorsUpdate.push(error);
            }
        }
        httpUtil.sendJson(res, errorsUpdate, 422, "error");
    }
}

async function deleteDepense(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const depense = new Depense(req.body?.idtypedepense, req.body?.montant, req.body?.datedepense);
        depense._id = req.body?._id;

        await depense.delete(db).then(() => {
            httpUtil.sendJson(res, null, 200, "OK");
        });
    } catch (error) {
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}

async function readDepenseParMois(req, res) {
    const db = await getMongoDBDatabase();
    try {
        const depense = new Depense();

        const aggregate = [
            {
                $addFields: {
                    dateConvertie: {
                        $dateFromString: {
                            dateString: "$datedepense",
                            format: "%Y-%m-%d"
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
                    from: "typedepense",
                    localField: "idtypedepense",
                    foreignField: "_id",
                    as: "type"
                }
            },
            {
                $unwind: "$type"
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$dateConvertie" },
                        type: "$type.nom"
                    },
                    montant: { $sum: { $toDouble: "$montant" } }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    type: "$_id.type",
                    montant: 1
                }
            }
        ];

        await depense.readWithAggregate(db, aggregate).then((response) => {
            const result = new Array(12).fill(0);
            response.forEach(depense => {
                if (depense.type === "variable") {
                    result[depense.month-1] += depense.montant;
                }
                else if (depense.type === "fixe") {
                    for (let index = depense.month-1; index < result.length; index++) {
                        const element = result[index];
                        result[index] = element + depense.montant;
                    }
                }
            });
            httpUtil.sendJson(res, result, 200, "OK");
        });
    } catch (error) {
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}


exports.createDepense = createDepense;
exports.updateDepense = updateDepense;
exports.deleteDepense = deleteDepense;
exports.readDepense = readDepense;
exports.readDepenseParMois = readDepenseParMois;