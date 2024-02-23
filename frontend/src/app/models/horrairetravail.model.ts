import { TableObject } from "../beans/tableobject.bean";
import { Form } from "../interfaces/annotations/components/form.annotation.component";
import { Heures } from "./heures.model";

@Form({
    ngSubmit: 'submit()'
})
export class HorraireTravail extends TableObject {
    idemploye?: string;
    jour?: number;
    heures?: Heures[];

    constructor(idemploye?: string, jour?: number, heures?: Heures[]) {
        super();
        this.idemploye = idemploye;
        this.jour = jour;
        this.heures = heures;
    }


}
