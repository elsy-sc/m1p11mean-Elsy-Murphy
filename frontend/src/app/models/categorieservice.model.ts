import { TableObject } from "../beans/tableobject.bean";
import { Form } from "../interfaces/annotations/components/form.annotation.component";
import { LabelInput } from "../interfaces/annotations/components/labelinput.annotation.component";
import { Textarea } from "../interfaces/annotations/components/textarea.annotation.component";
import { List } from "../interfaces/annotations/list.annotation";

@Form({
    ngSubmit: 'submit()'
})
export class CategorieService extends TableObject{

    @LabelInput({
        name: 'nom',
        label: 'Nom de la catégorie',
    })
    @List({
        title: 'Nom de la catégorie',
        type: 'simple',
    })
    nom?: string;
    @Textarea({
        name: 'description',
        label: 'Description de la catégorie',
    })
    @List({
        title: 'Description de la catégorie',
        type: 'simple',
    })
    description?: string;
    idcategorieservice?: string;

    constructor(nom?: string, description?: string, idcategorieservice?: string) {
        super();
        this.nom = nom;
        this.description = description;
        this.idcategorieservice = idcategorieservice;
    }
    
}