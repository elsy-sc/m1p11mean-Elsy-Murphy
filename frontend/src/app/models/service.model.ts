import { TableObject } from "../beans/tableobject.bean";
import { Form } from "../interfaces/annotations/components/form.annotation.component";
import { LabelInput } from "../interfaces/annotations/components/labelinput.annotation.component";
import { Select } from "../interfaces/annotations/components/select.annotation.component";
import { Textarea } from "../interfaces/annotations/components/textarea.annotation.component";
import { List } from "../interfaces/annotations/list.annotation";
import { CategorieService } from "./categorieservice.model";
@Form({
    ngSubmit: 'submit()'
})
export class Service extends TableObject{
    @Select({
        label: 'Catégorie du service',
        name: 'idcategorieservice',
        labelValues: 'categorieservice',
        multiple: false,
    })
    @List({
        title: 'Catégorie du service',
        type: 'simple',
    })
    idcategorieservice?: string;
    @LabelInput({
        name: 'nom',
        label: 'Nom du service',
    })
    @List({
        title: 'Nom du service',
        type: 'simple',
    })
    nom?: string;
    @Textarea({
        name: 'description',
        label: 'Description du service',
    })
    @List({
        title: 'Description du service',
        type: 'simple',
    })
    description?: string;
    @LabelInput({
        name: 'duree',
        type: 'number',
        label: 'Durée du service(en heure)',
    })
    @List({
        title: 'Durée du service(en heure)',
        type: 'simple',
    })
    duree?: number;
    @LabelInput({
        name: 'prix',
        type: 'number',
        label: 'Prix du service(en MGA)',
    })
    @List({
        title: 'Prix du service(en MGA)',
        type: 'simple',
    })
    prix?: number;
    @LabelInput({
        name: 'commission',
        type: 'number',
        label: 'Commission du service(en %)',
    })
    @List({
        title: 'Commission du service(en %)',
        type: 'simple',
    })
    image?: string;

    commission?: number;
    categorieservice?: CategorieService;

    constructor(nom?: string, description?: string, duree?: number, prix?: number, commission?: number, idcategorieservice?: string, image?: string) {
        super();
        this.nom = nom;
        this.description = description;
        this.duree = duree;
        this.prix = prix;
        this.commission = commission;
        this.idcategorieservice = idcategorieservice;
        this.image = image;
    }

}