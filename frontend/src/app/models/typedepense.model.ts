import { TableObject } from "../beans/tableobject.bean";
import { Form } from "../interfaces/annotations/components/form.annotation.component";
import { LabelInput } from "../interfaces/annotations/components/labelinput.annotation.component";
import { Textarea } from "../interfaces/annotations/components/textarea.annotation.component";
import { List } from "../interfaces/annotations/list.annotation";

@Form({
    ngSubmit: 'submit()'
})
export class TypeDepense extends TableObject {
    @LabelInput({
        label: 'Nom',
        name: 'nom',
        type: 'text',
    })
    @List({
        title: 'Nom',
        type: 'simple'
    })
    nom?: string;
    @Textarea({
        label: 'Description',
        name: 'description',
    })
    @List({
        title: 'Description',
        type: 'simple'
    })
    description?: string;

    constructor(nom?: string, description?: string) {
        super();
        this.nom = nom;
        this.description = description;
    }

}