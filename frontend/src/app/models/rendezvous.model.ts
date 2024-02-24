import { Date } from "../beans/date.bean.util";
import { TableObject } from "../beans/tableobject.bean";
import { Form } from "../interfaces/annotations/components/form.annotation.component";
import { LabelInput } from "../interfaces/annotations/components/labelinput.annotation.component";
import { Select } from "../interfaces/annotations/components/select.annotation.component";
import { List } from "../interfaces/annotations/list.annotation";
import { Paiement } from "./paiement.model";
import { Service } from "./service.model";
import { Utilisateur } from "./utilisateur.model";

@Form({
    ngSubmit: "submit()",
})
export class Rendezvous extends TableObject {
    
    @Select({
        label: 'Client',
        name: 'idclient',
        labelValues: 'clients',
        multiple: false,
        rest: 'optionValue=\'_id\' optionLabel=\'nom\'',
    })
    @List({
        title: 'Client du rendez-vous',
        type: 'simple'
    })
    idclient?: string;
    @Select({
        label: 'Service',
        name: 'idservice',
        labelValues: 'services',
        multiple: false,
        rest: 'optionValue=\'_id\' optionLabel=\'nom\'',
    })
    @List({
        title: 'Service du rendez-vous',
        type: 'simple'
    })
    idservice?: string;
    @LabelInput({
        label: 'Date et heure du rendez-vous',
        name: 'dateheurerendezvous',
        type: 'datetime-local',
    })
    @List({
        title: 'Date et heure du rendez-vous',
        type: 'simple'
    })
    dateheurerendezvous?: Date;


    client?: Utilisateur;
    service?: Service[];
    paiement?: Paiement[];

    constructor(idclient?: string, idservice?: string, dateheurerendezvous?: Date) {
        super();
        this.idclient = idclient;
        this.idservice = idservice;
        this.dateheurerendezvous = dateheurerendezvous;
    }
}