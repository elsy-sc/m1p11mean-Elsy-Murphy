const { TableObject } = require("../beans/tableobject.bean");
const { getNonEmptyObject } = require("../utils/object.util");

class Service extends TableObject {
    constructor(idcategorieservice, nom, description, duree, prix, commission) {
        super();
        this.idcategorieservice = idcategorieservice;
        this.nom = (nom != undefined && nom != null && nom.toString().trim() != "")  ? nom : undefined;
        this.description = (description != undefined && description != null && description.toString().trim() != "")  ? description : undefined;
        this.duree = getNonEmptyObject(duree); // en heure // nombre floatant
        this.prix = getNonEmptyObject(prix); // en ariary // nombre floatant
        this.commission = commission; // en pourcentage // nombre floatant
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
            throw  {
                field: 'nom',
                message: 'Le champ nom est obligatoire. veuillez entrer le nom du service'
            }
        }
        this.nom = nom;
    }

    setPrix(prix) {
        if (prix == null || prix == undefined) {
            throw {
                field: 'prix',
                message: 'Le champ prix est obligatoire. veuillez entrer le prix du service'
            
            }
        }
        this.prix = prix;
    }

    setDuree(duree) {
        if (duree == null || duree == undefined ) {
            throw {
                field: 'duree',
                message: 'Le champ duree est obligatoire. veuillez entrer la durée du service'
            }
        }
        this.duree = duree;
    }

    setIdcategorieservice(idcategorieservice) {
        if (idcategorieservice == null || idcategorieservice == undefined || idcategorieservice.trim() == "") {
            throw {
                field: 'idcategorieservice',
                message: 'Le champ idcategorieservice est obligatoire. veuillez entrer l\'id de la catégorie du service'
            }
        }
        this.idcategorieservice = idcategorieservice;
    }

    async create(connection) {
        if (this.commission) {
            this.commission = 0;
        }
        await super.create(connection);
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

exports.Service = Service;