import { Date } from "../beans/date.bean.util";
import { TableObject } from "../beans/tableobject.bean";
import { Service } from "./service.model";
import { Utilisateur } from "./utilisateur.model";

export class Rendezvous extends TableObject {
    
    idclient?: string;
    idservice?: string;
    dateheurerendezvous?: Date;
    client?: Utilisateur;
    service?: Service;

    constructor() {
        super();
        this.client = new Utilisateur();
        this.service = new Service();
    }
}