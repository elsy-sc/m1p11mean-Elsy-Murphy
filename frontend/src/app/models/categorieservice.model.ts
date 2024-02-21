import { TableObject } from "../beans/tableobject.bean";

export class CategoryService extends TableObject{

    nom?: string;
    description?: string;
    idcategorieservice?: string;

    constructor(nom?: string, description?: string, idcategorieservice?: string) {
        super();
        this.nom = nom;
        this.description = description;
        this.idcategorieservice = idcategorieservice;
    }
}