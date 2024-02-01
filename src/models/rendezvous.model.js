const { TableObject } = require("../bean/tableobject.bean");

class Rendezvous extends TableObject {
    constructor(idclient, idservice, dateheurerendezvous) {
        super();
        this.idclient = idclient;
        this.idservice = idservice;
        this.dateheurerendezvous = dateheurerendezvous;
    }

    async read(connection, afterWhereString) {
        this._state = 1;
        return await super.read(connection, afterWhereString);
    }

    async delete (connection, afterWhereString) {
        if (this._id == null || this._id == undefined || this._id.trim() == ""){
            throw new Error("L'id du rendezvous est obligatoire");
        }
        await super.update(connection, {_state: -1}, afterWhereString);
    }
}

exports.Rendezvous = Rendezvous;