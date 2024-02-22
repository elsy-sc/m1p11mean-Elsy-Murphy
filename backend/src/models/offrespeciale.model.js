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
            throw {
                field: 'descriptiooffrespeciale',
                message: 'La description de l\'offre spéciale est obligatoire. veuillez entrer la description de l\'offre spéciale'
            }
        }
        this.descriptiooffrespeciale = descriptiooffrespeciale;
    }

    setDateheuredebutoffrespeciale(dateheuredebutoffrespeciale) {
        if (dateheuredebutoffrespeciale == null || dateheuredebutoffrespeciale == undefined || dateheuredebutoffrespeciale.trim() == "") {
            throw {
                field: 'dateheuredebutoffrespeciale',
                message: 'La date de début de l\'offre spéciale est obligatoire. veuillez entrer la date de début de l\'offre spéciale'
            }
        }
        this.dateheuredebutoffrespeciale = dateheuredebutoffrespeciale;
    }

    setDateheurefinoffrespeciale(dateheurefinoffrespeciale) {
        if (dateheurefinoffrespeciale == null || dateheurefinoffrespeciale == undefined || dateheurefinoffrespeciale.trim() == "") {
            throw {
                field: 'dateheurefinoffrespeciale',
                message: 'La date de fin de l\'offre spéciale est obligatoire. veuillez entrer la date de fin de l\'offre spéciale'
            }
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
