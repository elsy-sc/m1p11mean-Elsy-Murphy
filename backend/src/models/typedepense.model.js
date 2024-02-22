const { TableObject } = require("../beans/tableobject.bean");

class TypeDepense extends TableObject {
    constructor (nom,description) {
        super();
        this.nom = (nom != undefined &&  nom != null && nom.toString().trim() != "")  ? nom : undefined;
        this.description = (description != undefined &&  description != null && description.toString().trim() != "")  ? description : undefined;
    }

    setNom(nom) {
        if (nom == null || nom == undefined || nom.trim() == "") {
            throw {
                field: "nom",
                message: "Le champ nom est obligatoire. veuillez entrer votre nom"
            }
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