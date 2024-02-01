const { TableObject } = require("../bean/tableobject.bean");

class Categorieservice extends TableObject {
    constructor(nom, description, idcategorieservice) {
        super();
        this.nom = nom;
        this.description = description;
        this.idcategorieservice = idcategorieservice;
    }

    setNom(nom) {
        if (nom == null || nom == undefined || nom.trim() == "") {
            throw new Error("Le nom de la catégorie de service est obligatoire");
        }
        this.nom = nom;
    }

    async read(connection, afterWhereString) {
        this._state = 1;
        return await super.read(connection, afterWhereString);
    }

    async delete (connection, afterWhereString) {
        if (this._id == null || this._id == undefined || this._id.trim() == ""){
            throw new Error("L'id du service est obligatoire");
        }
        await super.update(connection, {_state: -1}, afterWhereString);
    }
    
}

exports.Categorieservice = Categorieservice;