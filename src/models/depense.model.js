const { TableObject } = require("../bean/tableobject.bean");

class Depense extends TableObject {
    constructor (idtypedepense,montant,datedepense) {
        super();
        this.idtypedepense = idtypedepense;
        this.montant = montant;
        this.datedepense = datedepense;
    }
}

exports.Depense = Depense;