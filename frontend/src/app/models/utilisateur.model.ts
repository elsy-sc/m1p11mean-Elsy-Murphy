import { Date } from "../beans/date.bean.util";
import { TokenObject } from "../beans/tokenobject.bean";
import { LabelInput } from "../interfaces/annotations/components/labelinput.annotation.component";
import { Select } from "../interfaces/annotations/components/select.annotation.component";
import { Textarea } from "../interfaces/annotations/components/textarea.annotation.component";
import { List } from "../interfaces/annotations/list.annotation";

export class Utilisateur extends TokenObject {
    @LabelInput({
        label: 'Nom',
        name: 'nom',
        type: 'text',
    })
    @List({
        title: 'nom',
        type: 'simple'
    })
    nom: string|undefined;
    @Textarea({
        label: 'Prénom',
        name: 'prenom',
    })
    @List({
        title: 'prenom',
        type: 'simple'
    })
    prenom: string|undefined;
    @LabelInput({
        label: 'Email',
        name: 'email',
        type: 'email',
    })
    @List({
        title: 'email',
        type: 'simple'
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
        labelValues: "[{label:  'Employe',value: { id:  1, name: 'Employe' }},{label: 'Manager',value: { id:  2, name: 'Manager' }},{label: 'Client',value: { id:  2, name: 'Client' }},]",
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