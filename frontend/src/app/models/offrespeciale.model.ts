import { Service } from "./service.model";

export class Offrespeciale extends Service {
    
    descriptionoffrespeciale?: string;
    reductionoffrespeciale?: number;
    dateheuredebutoffrespeciale?: string;
    dateheurefinoffrespeciale?: string;
    
    constructor (descriptionoffrespeciale?: string, reductionoffrespeciale?: number, dateheuredebutoffrespeciale?: string, dateheurefinoffrespeciale?: string){
        super();
        this.descriptionoffrespeciale = descriptionoffrespeciale;
        this.reductionoffrespeciale = reductionoffrespeciale;
        this.dateheuredebutoffrespeciale = dateheuredebutoffrespeciale;
        this.dateheurefinoffrespeciale = dateheurefinoffrespeciale;
    }
    
}