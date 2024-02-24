import { Date } from "../beans/date.bean.util";
import { TableObject } from "../beans/tableobject.bean";
import { Form } from "../interfaces/annotations/components/form.annotation.component";
import { LabelInput } from "../interfaces/annotations/components/labelinput.annotation.component";
import { Select } from "../interfaces/annotations/components/select.annotation.component";
import { Textarea } from "../interfaces/annotations/components/textarea.annotation.component";
import { List } from "../interfaces/annotations/list.annotation";
import { TypeDepense } from "./typedepense.model";

@Form({
    ngSubmit: 'submit()'
})
export class Depense extends TableObject {
    @Select({
        label: 'Type du depense',
        name: 'idtypedepense',
        labelValues: 'typedepense',
        multiple: false,
    })
    @List({
        title: 'Type de depense',
        type: 'simple',
    })
    idtypedepense?:string;
    @LabelInput({
        label: 'Montant',
        name: 'montant',
        type: 'number',
    })
    @List({
        title: 'Montant',
        type: 'simple'
    })
    montant?:number;
    @Textarea({
        label: 'Description',
        name: 'description',
    })
    @List({
        title: 'Description',
        type: 'simple'
    })
    description?:string;
    @LabelInput({
        label: 'Date du depense',
        name: 'datedepense',
        type: 'date',
    })
    @List({
        title: 'Date du depense',
        type: 'simple'
    })
    datedepense?: Date;
    Type?: TypeDepense[];

    constructor(montant?:number,description?:string,datedepense?:Date,idtypedepense?:string) {
        super();
        this.idtypedepense = idtypedepense;
        this.montant = montant;
        this.description = description;
        this.datedepense = datedepense;
    }

}
