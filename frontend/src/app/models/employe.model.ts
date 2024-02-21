import { Date } from '../beans/date.bean.util';
import { Checkbox } from '../interfaces/annotations/components/checkbox.annotation.component';
import { LabelInput } from '../interfaces/annotations/components/labelinput.annotation.component';
import { Radio } from '../interfaces/annotations/components/radio.annotation.component';
import { List } from '../interfaces/annotations/list.annotation';
import { Utilisateur } from './utilisateur.model';

export class Employe extends Utilisateur {
    @LabelInput({
        label: 'CIN',
        name: 'cin',
        type: 'text',
    })
    @List({
        title: 'cin',
        type: 'simple'
    })
    cin: string|undefined;
    numerocartebancaire: string|undefined;

    constructor(nom?: string, prenom?: string, email?: string, datenaissance?: Date, numerotelephone?: string, motdepasse?: string, role?: number, cin?: string, numerocartebancaire?: string ) {
        super(nom, prenom, email, datenaissance, numerotelephone, motdepasse, role);
        this.cin = cin;
        this.numerocartebancaire = numerocartebancaire;
        this.role =  1;
    }
}