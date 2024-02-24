const { getNonEmptyObject } = require("../utils/object.util");

const Service = require("./service.model").Service;

class Offrespeciale extends Service {
    constructor(descriptionoffrespeciale, reductionoffrespeciale, dateheuredebutoffrespeciale, dateheurefinoffrespeciale, image) {
        super();
        this.tableName = "service";
        this.descriptionoffrespeciale = getNonEmptyObject(descriptionoffrespeciale);
        this.reductionoffrespeciale = getNonEmptyObject(reductionoffrespeciale);
        this.dateheuredebutoffrespeciale = dateheuredebutoffrespeciale;
        this.dateheurefinoffrespeciale = dateheurefinoffrespeciale;
        this.image = image;
    }

    setDescriptionoffrespeciale(descriptionoffrespeciale) {
        if (descriptionoffrespeciale == null || descriptionoffrespeciale == undefined || descriptionoffrespeciale.trim() == "") {
            throw {
                field: 'descriptionoffrespeciale',
                message: 'La description de l\'offre spéciale est obligatoire. veuillez entrer la description de l\'offre spéciale'
            }
        }
        this.descriptionoffrespeciale = descriptionoffrespeciale;
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
