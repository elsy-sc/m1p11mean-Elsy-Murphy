import { Service } from "./service.model";

class Offrespeciale extends Service {
    constructor(descriptiooffrespeciale, reductionoffrespeciale, dateheuredebutoffrespeciale, dateheurefinoffrespeciale) {
        super();
        this.descriptiooffrespeciale = descriptiooffrespeciale;
        this.reductionoffrespeciale = reductionoffrespeciale;
        this.dateheuredebutoffrespeciale = dateheuredebutoffrespeciale;
        this.dateheurefinoffrespeciale = dateheurefinoffrespeciale;
    }
}

exports.Offrespeciale = Offrespeciale;
