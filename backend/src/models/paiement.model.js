const { Date } = require("../beans/date.bean.util");
const { TableObject } = require("../beans/tableobject.bean");

class Paiement extends TableObject {
    constructor (idclient, idrendezvous, montantpaye, dateheurepaiement) {
        super();
        this.idclient = idclient;
        this.idrendezvous = idrendezvous;
        this.montantpaye = montantpaye;
        this.dateheurepaiement = dateheurepaiement;
        this.linkedTableId = [
            {
                tableName: "utilisateur",
                foreignField: "_id",
                localField: "idclient",
                as: "client",
            },
            {
                tableName: "rendezvous",
                foreignField: "_id",
                localField: "idrendezvous",
                as: "rendezVous",
            },
        ];
    }

    setIdclient(idclient) {
        if (idclient == null || idclient == undefined || idclient.trim() == "") {
            throw new Error("L'id du client est obligatoire");
        }
        this.idclient = idclient;
    }

    setIdRendezVous(idrendezvous) {
        if (idrendezvous == null || idrendezvous == undefined || idrendezvous.trim() == "") {
            throw new Error("L'id du rendez-vous est obligatoire");
        }
        this.idrendezvous = idrendezvous;
    }

    setMontantPaye (montantpaye) {
        if (montantpaye == null || montantpaye == undefined || montantpaye <= 0) {
            throw new Error("La valeur du montant paye est obligatoire et doit être superieur à 0");
        }
        this.montantpaye = montantpaye;
    }

    setDateHeurePaiement(dateheurepaiement) {
        if (dateheurepaiement == null || dateheurepaiement == undefined || dateheurepaiement.trim() == "") {
            this.dateheurepaiement = new Date().date;
        }
        else {  
            this.dateheurepaiement = dateheurepaiement;
        }
    }

    async read(connection, afterWhereString) {
        this._state = 1;
        return await super.read(connection, afterWhereString);
    }

    async delete (connection, afterWhereString) {
        if (this._id == null || this._id == undefined || this._id.trim() == ""){
            throw new Error("L'id du paiement est obligatoire");
        }
        await super.update(connection, {_state: -1}, afterWhereString);
    }    

}

exports.Paiement = Paiement;