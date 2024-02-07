import { Date } from "../beans/date.bean.util";
import { TableObject } from "../beans/tableobject.bean";
import { LabelInput } from "../interfaces/annotations/components/labelinput.annotation.component";
import { Select } from "../interfaces/annotations/components/select.annotation.component";
import { Textarea } from "../interfaces/annotations/components/textarea.annotation.component";

export class Utilisateur extends TableObject {
    @LabelInput({
        label: 'Nom',
        name: 'nom',
        type: 'text',
    })
    nom: string|undefined;
    @Textarea({
        label: 'Prénom',
        name: 'prenom',
    })
    prenom: string|undefined;
    @LabelInput({
        label: 'Email',
        name: 'email',
        type: 'email',
    })
    email: string|undefined;
    @LabelInput({
        label: 'Date de naissance',
        name: 'datenaissance',
        type: 'date',
    })
    datenaissance: Date|undefined;
    numerotelephone: string|undefined;
    motdepasse: string|undefined;
    @Select({
        label: 'Role',
        name: 'role',
        labelValues: {1: {id:1, name:'Employe'}, 2: {id:2, name:'Client'}, 3: {id:3, name:'Admin'}},
        multiple: true,
        multipleLabelSearch: 'name'
    })
    role: number|undefined;

    constructor(nom?: string, prenom?: string, email?: string, datenaissance?: Date, numerotelephone?: string, motdepasse?: string, role?: number) {
        super();
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.datenaissance = datenaissance;
        this.numerotelephone = numerotelephone;
        this.motdepasse = motdepasse;
        this.role = role;
    }
}