const { Rendezvous } = require("./rendezvous.model");

class SuiviEmployeRendezvous extends Rendezvous {
    constructor(idemploye, dateheuredebutsuivi, dateheurefinsuivi) {
        super();
        this.idemploye = idemploye;
        this.dateheuredebutsuivi = dateheuredebutsuivi;
        this.dateheurefinsuivi = dateheurefinsuivi;
    }
}

exports.SuiviEmployeRendezvous = SuiviEmployeRendezvous;