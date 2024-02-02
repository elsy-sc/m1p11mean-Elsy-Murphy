const { Employe } = require("../models/employe.model");
const { getMongoDBDatabase } = require("../utils/db.util");
const { checkPassword } = require("../utils/hash.util");
const httpUtil = require("../utils/http.util");

async function createEmploye (req,res) {
    const db = await getMongoDBDatabase();
    try {
        var employe = new Employe();
        await employe.setNom(req.body.nom);
        await employe.setPrenom(req.body.prenom);
        await employe.setEmail(req.body.email);
        await employe.setDateNaissance(req.body.datenaissance);
        await employe.setNumeroTelephone(req.body.numerotelephone);
        await employe.setMotDePasse(req.body.motdepasse);
        await employe.setCin(req.body.cin);
        await employe.setNumeroCarteBancaire(req.body.numerocartebancaire);

        await employe.create(db).then(() => {
            httpUtil.sendJson(res, null, 201, "Created");
        });
    } catch (error) {
        httpUtil.sendJson(res,null,error.status || error.statusCode || 500,error.message);
    }
}

async function readEmploye (req , res) {
    const db = await getMongoDBDatabase();
    try {
        var employe = new Employe(req.body?.nom,req.body?.prenom,req.body?.email,req.body?.datenaissance,req.body?.numerotelephone,req.body?.motdepasse,req.body?.role,req.body?.cin,req.body?.numerocartebancaire);

        await employe.read(db).then( (result) => {
            httpUtil.sendJson(res, result, 200);
        });

    } catch (error) {
        httpUtil.sendJson(res,null,error.status || error.statusCode || 500,error.message);
    }
}

async function updateEmploye (req,res) {
    const db = await getMongoDBDatabase();
    try {
        var employeWhere = new Employe();
        employeWhere._id = req.body?._id;

        var employeSet = new Employe();
        await employeSet.setNom(req.body.nom);
        await employeSet.setPrenom(req.body.prenom);
        await employeSet.setEmail(req.body.email);
        await employeSet.setDateNaissance(req.body.datenaissance);
        await employeSet.setNumeroTelephone(req.body.numerotelephone);
        await employeSet.setMotDePasse(req.body.motdepasse);
        await employeSet.setCin(req.body.cin);
        await employeSet.setNumeroCarteBancaire(req.body.numerocartebancaire);

        await employeWhere.update(db, employeSet).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");        
        });

    } catch (error) {
        httpUtil.sendJson(res,null,error.status || error.statusCode || 500,error.message);
    }
}

async function deleteEmploye (req, res) {
    const db = await getMongoDBDatabase();
    try {
        var employe = new Employe();
        employe._id = req.body?._id;

        await employe.delete(db).then(() => {
            httpUtil.sendJson(res, null, 201, "OK");        
        }); 
    } catch (error) {
        httpUtil.sendJson(res,null,error.status || error.statusCode || 500,error.message);
    }
}

async function loginEmploye (req,res) {
    const db = await getMongoDBDatabase();
    try {
        var employe = new Employe();
        employe.email = req.body?.email;
        await employe.read(db).then((result) => {
            if (result.length === 0) {
                httpUtil.sendJson(res,null, 404 , "votre compte n'existe pas !!");
            } 
            else {
                var validmotdepasse = checkPassword(req.body?.motdepasse, result[0].motdepasse);
                if (validmotdepasse) {
                    httpUtil.sendJson(res,result[0],200);
                } else {
                    httpUtil.sendJson(res,null,401, "votre mot de passe est incorrect !!");
                }
            }
        });
    } catch (error) {
        httpUtil.sendJson(res,null,error.status || error.statusCode || 500,error.message);
    }
}

exports.createEmploye = createEmploye;
exports.readEmploye = readEmploye;
exports.updateEmploye = updateEmploye;
exports.deleteEmploye = deleteEmploye;
exports.loginEmploye = loginEmploye;