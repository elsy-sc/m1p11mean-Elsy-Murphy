import { Date } from '../beans/date.bean.util';
import { LabelInput } from '../interfaces/annotations/components/labelinput.annotation.component';
import { Utilisateur } from './utilisateur.model';

export class Employe extends Utilisateur {
    @LabelInput({
        name: 'cin',
        type: 'text',
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