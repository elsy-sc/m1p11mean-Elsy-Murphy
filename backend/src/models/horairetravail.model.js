const { TableObject } = require("../beans/tableobject.bean");

class HoraireTravail extends TableObject {
    constructor (idemploye,jour,heures) {
        super();
        this.idemploye = idemploye;
        this.jour = jour;
        this.heures = heures;
        this.linkedTableId = [
            {
                tableName: "utilisateur",
                foreignField: "_id",
                localField: "idemploye",
                as: "Employe",
            },
        ];
    }

    setIdEmploye (idemploye) {
        if (idemploye == null || idemploye == undefined || idemploye.trim() == "") {
            throw new Error("L'id du l'employe est obligatoire");
        }
        this.idemploye = idemploye;
    }

    setJour (jour) {
        if (jour == null || jour == undefined || Number.isInteger(jour) == false) {
            throw new Error("le jour est obligatoire et doit être de type int");
        }
        this.jour = jour;
    }    

    setHeures(heures) {
        if (heures == null || heures == undefined || heures.length == 0) {
            this.heures = [];
        } else {
            this.heures = heures;
        }
    }

    async read(connection, afterWhereString, state = 1) {
        this._state = state;
        return await super.read(connection, afterWhereString);
    }

    async delete (connection, afterWhereString) {
        if (this._id == null || this._id == undefined || this._id.trim() == ""){
            throw new Error("L'id de l'horraire de travail est obligatoire");
        }
        await super.update(connection, {_state: -1}, afterWhereString);
    }    

}

exports.HoraireTravail = HoraireTravail;