const { TableObject } = require("../bean/tableobject.bean");

class Service extends TableObject {
    constructor(idcategorieservice, nom, description, duree, prix, commission) {
        super();
        this.idcategorieservice = idcategorieservice;
        this.nom = nom;
        this.description = description;
        this.duree = duree; // en heure // nombre floatant
        this.prix = prix; // en ariary // nombre floatant
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
            throw new Error("Le nom du service est obligatoire");
        }
        this.nom = nom;
    }

    setPrix(prix) {
        if (prix == null || prix == undefined) {
            throw new Error("Le prix du service est obligatoire");
        }
        this.prix = prix;
    }

    setDuree(duree) {
        if (duree == null || duree == undefined ) {
            throw new Error("La durée du service est obligatoire");
        }
        this.duree = duree;
    }

    setIdcategorieservice(idcategorieservice) {
        if (idcategorieservice == null || idcategorieservice == undefined || idcategorieservice.trim() == "") {
            throw new Error("La catégorie du service est obligatoire");
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