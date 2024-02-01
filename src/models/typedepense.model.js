const { TableObject } = require("../bean/tableobject.bean");

class TypeDepense extends TableObject {
    constructor (nom,description) {
        super();
        this.nom = nom;
        this.description = description;
    }

    setNom(nom) {
        if (nom == null || nom == undefined || nom.trim() == "") {
            throw new Error("le champ nom est obligatoire. veuillez entrer votre nom");
        }
        this.nom = nom;
    }

    async read(connection, afterWhereString) {
        this._state = 1;
        return await super.read(connection, afterWhereString);
    }

    async delete (connection, afterWhereString) {
        if (this._id == null || this._id == undefined || this._id.trim() == ""){
            throw new Error("L'id du type de depense est obligatoire");
        }
        await super.update(connection, {_state: -1}, afterWhereString);
    }

}

exports.TypeDepense = TypeDepense;