const { Date } = require("../bean/date.bean.util");
const { Rendezvous } = require("./rendezvous.model");

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