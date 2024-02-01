const { Date } = require("../bean/date.bean.util");
const { TableObject } = require("../bean/tableobject.bean");

class Depense extends TableObject {
    constructor (idtypedepense,montant,datedepense) {
        super();
        this.idtypedepense = idtypedepense;
        this.montant = montant;
        this.datedepense = datedepense;
        this.linkedTableId = [
            {
                tableName: "typedepense",
                foreignField: "_id",
                localField: "idtypedepense",
                as: "Type",
            },
        ];
    }

    setIdTypeDepense (idtypedepense) {
        if (idtypedepense == null || idtypedepense == undefined || idtypedepense.trim() == "") {
            throw new Error("L'id du type de depense est obligatoire");
        }
        this.idtypedepense = idtypedepense;   
    }

    setMontant (montant) {
        if (montant == null || montant == undefined || montant <= 0) {
            throw new Error("La valeur du montant est obligatoire et doit être superieur à 0");
        }
        this.montant = montant;
    }

    setDateDepense(datedepense) {
        if (datedepense == null || datedepense == undefined || datedepense.trim() == "") {
            this.datedepense = new Date().date;
        }
        else {  
            this.datedepense = datedepense;
        }
    }    

    async read(connection, afterWhereString) {
        this._state = 1;
        return await super.read(connection, afterWhereString);
    }

    async delete (connection, afterWhereString) {
        if (this._id == null || this._id == undefined || this._id.trim() == ""){
            throw new Error("L'id du depense est obligatoire");
        }
        await super.update(connection, {_state: -1}, afterWhereString);
    }

}

exports.Depense = Depense;