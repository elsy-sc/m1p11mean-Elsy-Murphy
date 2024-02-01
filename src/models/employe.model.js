const { Utilisateur } = require("./utilisateur.model");

class Employe extends Utilisateur {
    constructor (cin , numerocartebancaire) {
        super();
        this.cin = cin;
        this.numerocartebancaire = numerocartebancaire;
    }
}

exports.Employe = Employe;