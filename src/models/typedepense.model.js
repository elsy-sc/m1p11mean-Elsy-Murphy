const { TableObject } = require("../bean/tableobject.bean");

class TypeDepense extends TableObject {
    constructor (nom,description) {
        super();
        this.nom = nom;
        this.description = description;
    }
}

exports.TypeDepense = TypeDepense;