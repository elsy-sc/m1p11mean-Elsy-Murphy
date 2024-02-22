const { Date } = require("../beans/date.bean.util");
const { TableObject } = require("../beans/tableobject.bean");

class Depense extends TableObject {
    constructor (idtypedepense,montant,description,datedepense) {
        super();
        this.idtypedepense = idtypedepense;
        this.montant = montant;
        this.description = description;
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
            throw {
                field:"idtypedepense",
                message: "Le type de depense est obligatoire"
            }
        }
        this.idtypedepense = idtypedepense;   
    }

    setMontant (montant) {
        if (montant == null || montant == undefined || montant <= 0) {
            throw {
                field:"montant",
                message: "La valeur du montant est obligatoire et doit être superieur à 0"
            }
        }
        this.montant = montant;
    }

    setDescription (description) {
        if (description == null || description == undefined || description.trim() == '') {
            throw {
                field:"description",
                message: "Le champ description est obligatoire. veuillez entrer une description"
            }
        }
        this.description = description;
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