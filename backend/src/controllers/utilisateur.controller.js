const { getMongoDBDatabase } = require('../utils/db.util');
const httpUtil = require('../utils/http.util');
const { Utilisateur } = require('../models/utilisateur.model');
const { checkPassword } = require('../utils/hash.util');

async function createUtilisateur(req, res) {
    const db = await getMongoDBDatabase();
    try {
        var utilisateur = new Utilisateur();
        await utilisateur.setNom(req.body.nom);
        await utilisateur.setPrenom(req.body.prenom);
        await utilisateur.setEmail(req.body.email);
        await utilisateur.setDateNaissance(req.body.datenaissance);
        await utilisateur.setNumeroTelephone(req.body.numerotelephone);
        await utilisateur.setMotDePasse(req.body.motdepasse);
        await utilisateur.setRole(req.body.role);

        await utilisateur.create(db).then(() => {
            httpUtil.sendJson(res, [utilisateur], 201, "Created");
        })
    } catch (error) {
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}

async function readUtilisateur(req, res) {
    const db = await getMongoDBDatabase();
    try {
        var utilisateur = new Utilisateur(req.body?.nom, req.body?.prenom, req.body?.email, req.body?.datenaissance, req.body?.numerotelephone, req.body?.motdepasse, req.body?.role);
        await utilisateur.read(db).then((result) => {
            httpUtil.sendJson(res, result, 200);
        });

    } catch (error) {
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}

async function loginUtilisateur(req, res) {
    const db = await getMongoDBDatabase();
    try {
        var utilisateur = new Utilisateur();
        await utilisateur.setEmail(req.body.email);
        await utilisateur.setMotDePasse(req.body.motdepasse);
        
        utilisateur.motdepasse = null;
        await utilisateur.read(db).then((result) => {
            if (result.length === 0) {
                httpUtil.sendJson(res, null, 404, "votre compte n'existe pas !!");
            }
            else {
                var validmotdepasse = checkPassword(req.body?.motdepasse, result[0].motdepasse);
                if (validmotdepasse) {
                    httpUtil.sendJson(res, result, 200);
                } else {
                    httpUtil.sendJson(res, null, 401, "votre mot de passe est incorrect !!");
                }
            }
        });
    } catch (error) {
        httpUtil.sendJson(res, null,422, error.message);
    }
}

async function inscriptionUtilisateur(req, res) {
    const db = await getMongoDBDatabase();
    try {
        var utilisateur = new Utilisateur();
        await utilisateur.setNom(req.body.nom);
        await utilisateur.setPrenom(req.body.prenom);
        await utilisateur.setEmail(req.body.email);
        await utilisateur.setDateNaissance(req.body.datenaissance);
        await utilisateur.setNumeroTelephone(req.body.numerotelephone);
        await utilisateur.setMotDePasse(req.body.motdepasse);
        await utilisateur.setRole(req.body.role);

        var existingutilisateur = new Utilisateur();
        existingutilisateur.email = utilisateur.email;
        await existingutilisateur.read(db).then((result) =>{
            if (result.length !== 0) {
                httpUtil.sendJson(res, null, 400, "Adresse e-mail déjà utilisée. Veuillez choisir une autre adresse e-mail.");
            } else {
                utilisateur.create(db).then(() => {
                    httpUtil.sendJson(res, [utilisateur], 201, "Created");
                })
            }
        });
    } catch (error) {
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}

async function updateUtilisateur(req, res) {
    const db = await getMongoDBDatabase();
    try {
        var utilisateurWhere = new Utilisateur();
        utilisateurWhere._id = req.body?._id;

        var utilisateurSet = new Utilisateur();
        await utilisateurSet.setNom(req.body.nom);
        await utilisateurSet.setPrenom(req.body.prenom);
        await utilisateurSet.setEmail(req.body.email);
        await utilisateurSet.setDateNaissance(req.body.datenaissance);
        await utilisateurSet.setNumeroTelephone(req.body.numerotelephone);
        await utilisateurSet.setMotDePasse(req.body.motdepasse);
        await utilisateurSet.setRole(req.body.role);

        await utilisateurWhere.update(db, utilisateurSet).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");
        });

    } catch (error) {
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}

async function deleteUtilisateur(req, res) {
    const db = await getMongoDBDatabase();
    try {
        var utilisateur = new Utilisateur();
        utilisateur._id = req.body?._id;

        await utilisateur.delete(db).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");
        });
    } catch (error) {
        httpUtil.sendJson(res, null, error.status || error.statusCode || 500, error.message);
    }
}



exports.createUtilisateur = createUtilisateur;
exports.readUtilisateur = readUtilisateur;
exports.loginUtilisateur = loginUtilisateur;
exports.updateUtilisateur = updateUtilisateur;
exports.deleteUtilisateur = deleteUtilisateur;
exports.inscriptionUtilisateur = inscriptionUtilisateur;