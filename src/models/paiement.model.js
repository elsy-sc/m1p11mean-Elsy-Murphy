const { TableObject } = require("../bean/tableobject.bean");

class Paiement extends TableObject {
    constructor (idclient, idrendezvous, montantpaye, dateheurepaiement) {
        super();
        this.idclient = idclient;
        this.idrendezvous = idrendezvous;
        this.montantpaye = montantpaye;
        this.dateheurepaiement = dateheurepaiement;
    }
}

exports.Paiement = Paiement;