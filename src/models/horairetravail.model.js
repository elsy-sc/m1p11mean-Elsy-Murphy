const { TableObject } = require("../bean/tableobject.bean");

class HoraireTravail extends TableObject {
    constructor (idemploye,jour,heures) {
        super();
        this.idemploye = idemploye;
        this.jour = jour;
        this.heures = heures;
    }
}

exports.HoraireTravail = HoraireTravail;