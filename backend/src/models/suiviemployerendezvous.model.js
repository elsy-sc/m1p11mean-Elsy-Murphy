const { Date } = require("../beans/date.bean.util");
const { Rendezvous } = require("./rendezvous.model");

class SuiviEmployeRendezvous extends Rendezvous {
    constructor(idemploye, dateheuredebutsuivi, dateheurefinsuivi, dateheurevalidation) {
        super();
        this.tableName = "rendezvous";
        this.idemploye = idemploye;
        this.dateheurevalidation = dateheurevalidation;
        this.dateheuredebutsuivi = dateheuredebutsuivi;
        this.dateheurefinsuivi = dateheurefinsuivi;
        this.linkedTableId ?
            this.linkedTableId = [
                ...this.linkedTableId,
                {
                    tableName: "utilisateur",
                    foreignField: "_id",
                    localField: "idemploye",
                    as: "employe",
                },
            ]:
            this.linkedTableId = [
                {
                    tableName: "utilisateur",
                    foreignField: "_id",
                    localField: "idemploye",
                    as: "employe",
                },
            ];
    }

    setIdemploye(idemploye) {
        // if (idemploye == null || idemploye == undefined || idemploye.trim() == "") {
        //     throw {
        //         field: 'idemploye',
        //         message: 'Le champ idemploye est obligatoire. veuillez entrer le id de l\'employe'
        //     }
        // }
        this.idemploye = idemploye;
    }

    setDateheuredebutsuivi(dateheuredebutsuivi) {
        if (dateheuredebutsuivi == null || dateheuredebutsuivi == undefined || dateheuredebutsuivi.trim() == "") {
            this.dateheuredebutsuivi = this.dateheurerendezvous;
        }
        else {
            this.dateheuredebutsuivi = dateheuredebutsuivi;
        }
    }

    setDateheurefinsuivi(dateheurefinsuivi) {
        if (dateheurefinsuivi == null || dateheurefinsuivi == undefined || dateheurefinsuivi.trim() == "") {
            this.dateheurefinsuivi = new Date().date;
        }
        else {
            this.dateheurefinsuivi = dateheurefinsuivi;
        }
    }

}

exports.SuiviEmployeRendezvous = SuiviEmployeRendezvous;