import { TableObject } from "../beans/tableobject.bean";
import { Form } from "../interfaces/annotations/components/form.annotation.component";
import { LabelInput } from "../interfaces/annotations/components/labelinput.annotation.component";
import { Textarea } from "../interfaces/annotations/components/textarea.annotation.component";
import { List } from "../interfaces/annotations/list.annotation";
@Form({
    ngSubmit: 'submit()',
})
export class Service extends TableObject{
    @LabelInput({
        name: 'nom',
    })
    @List({
        title: 'Nom du service',
        type: 'simple',
    })
    nom?: string;
    @Textarea({
        name: 'description',
    })
    @List({
        title: 'Description du service',
        type: 'simple',
    })
    description?: string;
    @LabelInput({
        name: 'duree',
        type: 'number',
    })
    @List({
        title: 'Durée du service(en heure)',
        type: 'simple',
    })
    duree?: number;
    @LabelInput({
        name: 'prix',
        type: 'number',
    })
    @List({
        title: 'Prix du service(en MGA)',
        type: 'simple',
    })
    prix?: number;
    @LabelInput({
        name: 'commission',
        type: 'number',
    })
    @List({
        title: 'Commission du service(en %)',
        type: 'simple',
    })
    commission?: number;

    constructor(nom?: string, description?: string, duree?: number, prix?: number, commission?: number) {
        super();
        this.nom = nom;
        this.description = description;
        this.duree = duree;
        this.prix = prix;
        this.commission = commission;
    }
    
}