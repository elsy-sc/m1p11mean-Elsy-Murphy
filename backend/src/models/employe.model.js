const { Utilisateur } = require("./utilisateur.model");

class Employe extends Utilisateur {
    constructor (nom , prenom , email , datenaissance , numerotelephone , motdepasse , role , cin , numerocartebancaire) {
        super(nom , prenom , email , datenaissance , numerotelephone , motdepasse , role);
        this.tableName = "utilisateur";
        this.cin = (cin != undefined &&  cin != null && cin.toString().trim() != "")  ? cin : undefined;
        this.numerocartebancaire = (numerocartebancaire != undefined &&  numerocartebancaire != null && numerocartebancaire.toString().trim() != "")  ? numerocartebancaire : undefined;
        this.role = 1;
    }

    async setCin (cin) {
        if (cin == null || cin == undefined || cin.trim() == '') {
            throw {
                field: 'cin',
                message: 'Le champ cin est obligatoire. veuillez entrer votre cin'
            }
        }
        this.cin =  cin;
    }

    async setNumeroCarteBancaire (numerocartebancaire) {
        if (numerocartebancaire == null || numerocartebancaire == undefined || numerocartebancaire.trim() == '') {
            throw {
                field: 'numerocartebancaire',
                message: 'Le champ numerocartebancaire est obligatoire. veuillez entrer votre numerocartebancaire'
            }
        }
        this.numerocartebancaire =  numerocartebancaire;
    }

}

exports.Employe = Employe;