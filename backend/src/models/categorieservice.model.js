const { TableObject } = require("../beans/tableobject.bean");

class Categorieservice extends TableObject {
    constructor(nom, description, idcategorieservice) {
        super();
        this.nom = nom;
        this.description = description;
        this.idcategorieservice = idcategorieservice;
        this.linkedTableId = [
            {
                tableName: "categorieservice",
                foreignField: "_id",
                localField: "idcategorieservice",
                as: "categorieservice",
            },
        ];
    }

    setNom(nom) {
        if (nom == null || nom == undefined || nom.trim() == "") {
            throw {
                field: 'nom',
                message: 'Le champ nom est obligatoire. veuillez entrer le nom de la catégorie du service'
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
            throw new Error("L'id du service est obligatoire");
        }
        await super.update(connection, {_state: -1}, afterWhereString);
    }
    
}

exports.Categorieservice = Categorieservice;