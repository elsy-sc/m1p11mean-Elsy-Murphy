const { Date } = require("../beans/date.bean.util");
const { TableObject } = require("../beans/tableobject.bean");
const { getNonEmptyObject } = require("../utils/object.util");

class Rendezvous extends TableObject {
    constructor(idclient, idservice, dateheurerendezvous) {
        super();
        this.idclient = idclient;
        this.idservice = idservice;
        this.dateheurerendezvous = getNonEmptyObject(dateheurerendezvous);
        this.linkedTableId = [
            {
                tableName: "utilisateur",
                foreignField: "_id",
                localField: "idclient",
                as: "client",
            },
            {
                tableName: "service",
                foreignField: "_id",
                localField: "idservice",
                as: "service",
            },
            {
                tableName: "paiement",
                foreignField: "idrendezvous",
                localField: "_id",
                as: "paiement",
            }
        ];
    }

    setIdclient(idclient) {
        if (idclient == null || idclient == undefined || idclient.trim() == "") {
            throw {
                field: 'idclient',
                message: 'Le champ idclient est obligatoire. veuillez entrer le id du client'
            }
        }
        this.idclient = idclient;
    }

    setIdservice(idservice) {
        if (idservice == null || idservice == undefined || idservice.trim() == "") {
            throw {
                field: 'idservice',
                message: 'Le champ idservice est obligatoire. veuillez entrer le id du service'
            }
        }
        this.idservice = idservice;
    }

    setDateheurerendezvous(dateheurerendezvous) {
        if (dateheurerendezvous == null || dateheurerendezvous == undefined || dateheurerendezvous.trim() == "") {
            this.dateheurerendezvous = new Date().date;
        }
        else {  
            this.dateheurerendezvous = dateheurerendezvous;
        }
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