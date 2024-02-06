import { Date } from "../beans/date.bean.util";
import { TableObject } from "../beans/tableobject.bean";

export class Utilisateur extends TableObject {
    nom: string;
    prenom: string;
    email: string;
    datenaissance: Date;
    numerotelephone: string;
    motdepasse: string;
    role: number;

    constructor(nom: string, prenom: string, email: string, datenaissance: Date, numerotelephone: string, motdepasse: string, role: number) {
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