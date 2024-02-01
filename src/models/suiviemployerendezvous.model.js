const { Rendezvous } = require("./rendezvous.model");
const { Date } = require("./date.bean.util");

class SuiviEmployeRendezvous extends Rendezvous {
    constructor(idemploye, dateheuredebutsuivi, dateheurefinsuivi) {
        super();
        this.idemploye = idemploye;
        this.dateheuredebutsuivi = dateheuredebutsuivi;
        this.dateheurefinsuivi = dateheurefinsuivi;
    }

    setIdemploye(idemploye) {
        if (idemploye == null || idemploye == undefined || idemploye.trim() == "") {
            throw new Error("L'id de l'employé est obligatoire");
        }
        this.idemploye = idemploye;
    }

    setDateheuredebutsuivi(dateheuredebutsuivi) {
        if (dateheuredebutsuivi == null || dateheuredebutsuivi == undefined || dateheuredebutsuivi.trim() == "") {
            this.dateheuredebutsuivi = this.dateheurerendezvous;
        }
        this.dateheuredebutsuivi = dateheuredebutsuivi;
    }

    setDateheurefinsuivi(dateheurefinsuivi) {
        if (dateheurefinsuivi == null || dateheurefinsuivi == undefined || dateheurefinsuivi.trim() == "") {
            this.dateheurefinsuivi = new Date();
        }
        this.dateheurefinsuivi = dateheurefinsuivi;
    }
}

exports.SuiviEmployeRendezvous = SuiviEmployeRendezvous;