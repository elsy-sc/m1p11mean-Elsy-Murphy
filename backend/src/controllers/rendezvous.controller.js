const { Date } = require("../beans/date.bean.util");
const { Rendezvous } = require("../models/rendezvous.model");
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

exports.createRendezvous = createRendezvous;
exports.readRendezvous = readRendezvous;
exports.updateRendezvous = updateRendezvous;
exports.deleteRendezvous = deleteRendezvous;
