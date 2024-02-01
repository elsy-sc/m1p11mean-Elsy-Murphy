const Service = require("./service.model").Service;

class Offrespeciale extends Service {
    constructor(descriptiooffrespeciale, reductionoffrespeciale, dateheuredebutoffrespeciale, dateheurefinoffrespeciale) {
        super();
        this.tableName = "service";
        this.descriptiooffrespeciale = descriptiooffrespeciale;
        this.reductionoffrespeciale = reductionoffrespeciale;
        this.dateheuredebutoffrespeciale = dateheuredebutoffrespeciale;
        this.dateheurefinoffrespeciale = dateheurefinoffrespeciale;
    }

    setDescriptionoffrespeciale(descriptiooffrespeciale) {
        if (descriptiooffrespeciale == null || descriptiooffrespeciale == undefined || descriptiooffrespeciale.trim() == "") {
            throw new Error("La description de l'offre spéciale est obligatoire");
        }
        this.descriptiooffrespeciale = descriptiooffrespeciale;
    }

    setDateheuredebutoffrespeciale(dateheuredebutoffrespeciale) {
        if (dateheuredebutoffrespeciale == null || dateheuredebutoffrespeciale == undefined || dateheuredebutoffrespeciale.trim() == "") {
            throw new Error("La date de début de l'offre spéciale est obligatoire");
        }
        this.dateheuredebutoffrespeciale = dateheuredebutoffrespeciale;
    }

    setDateheurefinoffrespeciale(dateheurefinoffrespeciale) {
        if (dateheurefinoffrespeciale == null || dateheurefinoffrespeciale == undefined || dateheurefinoffrespeciale.trim() == "") {
            throw new Error("La date de fin de l'offre spéciale est obligatoire");
        }
        this.dateheurefinoffrespeciale = dateheurefinoffrespeciale;
    }

    setReductionoffrespeciale(reductionoffrespeciale) {
        if (reductionoffrespeciale == null || reductionoffrespeciale == undefined) {
            this.reductionoffrespeciale = 0.0;
        }
        else {
            this.reductionoffrespeciale = reductionoffrespeciale;
        }
    }
}

exports.Offrespeciale = Offrespeciale;
