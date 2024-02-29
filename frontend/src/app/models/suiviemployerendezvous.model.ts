import { Date } from "../beans/date.bean.util";
import { Form } from "../interfaces/annotations/components/form.annotation.component";
import { LabelInput } from "../interfaces/annotations/components/labelinput.annotation.component";
import { Select } from "../interfaces/annotations/components/select.annotation.component";
import { List } from "../interfaces/annotations/list.annotation";
import { Employe } from "./employe.model";
import { Rendezvous } from "./rendezvous.model";

@Form({
    ngSubmit: 'submit()'
})
export class SuiviEmployeRendezVous extends Rendezvous{
    
    @List({
        title: 'Employe du rendez-vous',
        type: 'simple'
    })
    @Select({
        label: 'Employe',
        name: 'idemploye',
        labelValues: 'employes',
        multiple: false,
        rest: 'optionValue=\'_id\' optionLabel=\'nom\''
    })
    idemploye?: string;
    @List({
        title: 'Date et heure de debut du suivi',
        type: 'simple'
    })
    @LabelInput({
        label: 'Date et heure de debut du suivi',
        name: 'dateheuredebutsuivi',
        type: 'datetime-local',
    })
    dateheuredebutsuivi?: string;
    @List({
        title: 'Date et heure de fin du suivi',
        type: 'simple'
    })
    @LabelInput({
        label: 'Date et heure de fin du suivi',
        name: 'dateheurefinsuivi',
        type: 'datetime-local',
    })
    dateheurefinsuivi?: string;
    dateheurevalidation?: string;
    employe?: Employe;
    montantcommission?: number;

    constructor(idemploye?: string, dateheuredebutsuivi?: string, dateheurefinsuivi?: string, dateheurevalidation?: string) {
        super();
        this.idemploye = idemploye;
        this.dateheuredebutsuivi = dateheuredebutsuivi;
        this.dateheurefinsuivi = dateheurefinsuivi;
        this.dateheurevalidation = dateheurevalidation;
    }
}