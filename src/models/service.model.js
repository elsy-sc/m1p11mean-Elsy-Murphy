const { TableObject } = require("../bean/tableobject.bean");

class Service extends TableObject {
    constructor(idcategorieservice, nom, description, duree, commission) {
        super();
        this.idcategorieservice = idcategorieservice;
        this.nom = nom;
        this.description = description;
        this.duree = duree;
        this.commission = commission;
    }
}

exports.Service = Service;