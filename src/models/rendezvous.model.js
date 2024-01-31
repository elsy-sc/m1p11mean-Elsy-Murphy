const { TableObject } = require("../bean/tableobject.bean");

class Rendezvous extends TableObject {
    constructor(idclient, idservice, dateheurerendezvous) {
        super();
        this.idclient = idclient;
        this.idservice = idservice;
        this.dateheurerendezvous = dateheurerendezvous;
    }
}

exports.Rendezvous = Rendezvous;