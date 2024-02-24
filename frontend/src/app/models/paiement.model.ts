import { Date } from "../beans/date.bean.util";
import { TableObject } from "../beans/tableobject.bean";
import { Form } from "../interfaces/annotations/components/form.annotation.component";
import { LabelInput } from "../interfaces/annotations/components/labelinput.annotation.component";
import { Select } from "../interfaces/annotations/components/select.annotation.component";
import { List } from "../interfaces/annotations/list.annotation";
import { Rendezvous } from "./rendezvous.model";
import { Utilisateur } from "./utilisateur.model";

@Form({
    ngSubmit: 'submit()'
})
export class Paiement extends TableObject {
    @Select({
        label: 'Client',
        name: 'idclient',
        labelValues: 'utilisateur',
        multiple: false,
    })
    @List({
        title: 'Client',
        type: 'simple',
    })
    idclient?: string;
    @Select({
        label: 'Rendez-vous',
        name: 'idrendezvous',
        labelValues: 'rendevous',
        multiple: false,
    })
    @List({
        title: 'Rendez-vous',
        type: 'simple',
    })
    idrendezvous?: string;
    @LabelInput({
        label: 'Montant Paye',
        name: 'montantpaye',
        type: 'number',
    })
    @List({
        title: 'Montant Paye',
        type: 'simple'
    })
    montantpaye?: number;
    @LabelInput({
        label: 'Date heure de paiement',
        name: 'dateheurepaiement',
        type: 'date',
    })
    @List({
        title: 'Date heure de paiement',
        type: 'simple'
    })
    dateheurepaiement?: Date;

    client?: Utilisateur[];
    rendezVous?: Rendezvous[];

    constructor(idclient?: string, idrendezvous?: string, montantpaye?: number, dateheurepaiement?: Date) {
        super();
        this.idclient = idclient;
        this.idrendezvous = idrendezvous;
        this.montantpaye = montantpaye;
        this.dateheurepaiement = dateheurepaiement;
    } 

}