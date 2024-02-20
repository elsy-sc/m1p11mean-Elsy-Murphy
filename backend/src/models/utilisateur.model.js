const {hashPassword} = require('../utils/hash.util');
const { TokenObject } = require("../beans/tokenobject.bean.util");

class Utilisateur extends TokenObject {
    constructor (nom , prenom , email , datenaissance , numerotelephone , motdepasse , role) {
        super();        
        this.nom = (nom != undefined && nom != null && nom.toString().trim() != "")  ? nom : undefined;
        this.prenom = (prenom != undefined &&  prenom != null && prenom.toString().trim() != "")  ? prenom : undefined;
        this.email = (email != undefined && email != null && email.toString().trim() != "")  ? email : undefined;;
        this.datenaissance = datenaissance;
        this.numerotelephone = numerotelephone;
        this.motdepasse = motdepasse;
        this.role = role;
    }

    async setNom (nom) {
        if (nom == null || nom == undefined || nom.trim() == '') {
            throw {
                field: 'nom',
                message: 'Le champ nom est obligatoire. veuillez entrer votre nom'
            }
        }
        this.nom = nom;
    }

    async setPrenom (prenom) {
        if (prenom == null || prenom == undefined || prenom.trim() == '') {
            throw {
                field: 'prenom',
                message: 'Le champ prenom est obligatoire. veuillez entrer votre prenom'
            }
        }
        this.prenom = prenom;
    }

    async setEmail (email) {
        if (email == null || email == undefined || email.trim() == '') {
            throw {
                field: 'email',
                message: 'Le champ email est obligatoire. veuillez entrer votre email'
            }
        }
        this.email = email;
    }

    async setDateNaissance (datenaissance) {
        if (datenaissance == null || datenaissance == undefined) {
            throw {
                field: 'datenaissance',
                message: 'Le champ datenaissance est obligatoire. veuillez entrer votre datenaissance'
            }
        }
        this.datenaissance = datenaissance;
    }

    async setNumeroTelephone (numerotelephone) {
        if (numerotelephone == null || numerotelephone == undefined || numerotelephone.trim() == '') {
            throw {
                field: 'numerotelephone',
                message: 'Le champ numerotelephone est obligatoire. veuillez entrer votre numerotelephone'
            }
        }
        this.numerotelephone = numerotelephone;
    }

    async setMotDePasse (motdepasse) {
        if (motdepasse == null || motdepasse == undefined || motdepasse.trim() == '') {
            throw {
                field: 'motdepasse',
                message: 'Le champ motdepasse est obligatoire. veuillez entrer votre motdepasse'
            }
        }
        this.motdepasse =  hashPassword(motdepasse);
    }
    
    async setRole (role) {
        if (role == null || role == undefined) {
            throw new Error('Le champ role est obligatoire. veuillez entrer votre role');
        }
        this.role = role;
    }

    async read (connection,afterWhereString) {
        this._state = 1;
        return await super.read(connection,afterWhereString);
    }

    async delete (connection,afterSetString) {
        if (this._id == null || this._id == undefined || this._id.trim() == '') {
            throw new Error("_id est obligatoire");      
        }
        super.update(connection,{_state: -1}, afterSetString);
    }

}

exports.Utilisateur = Utilisateur;