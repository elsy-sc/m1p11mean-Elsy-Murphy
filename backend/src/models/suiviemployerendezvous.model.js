const { Date } = require("../beans/date.bean.util");
const { Rendezvous } = require("./rendezvous.model");
const moment = require("moment");

class SuiviEmployeRendezvous extends Rendezvous {
    constructor(idemploye, dateheuredebutsuivi, dateheurefinsuivi, dateheurevalidation) {
        super();
        this.tableName = "rendezvous";
        this.idemploye = idemploye;
        this.dateheuredebutsuivi = dateheuredebutsuivi;
        this.dateheurefinsuivi = dateheurefinsuivi;
        this.dateheurevalidation = dateheurevalidation;
        this.linkedTableId ?
            this.linkedTableId = [
                ...this.linkedTableId,
                {
                    tableName: "utilisateur",
                    foreignField: "_id",
                    localField: "idemploye",
                    as: "employe",
                },
            ]:
            this.linkedTableId = [
                {
                    tableName: "utilisateur",
                    foreignField: "_id",
                    localField: "idemploye",
                    as: "employe",
                },
            ];
    }

    setIdemploye(idemploye) {
        // if (idemploye == null || idemploye == undefined || idemploye.trim() == "") {
        //     throw {
        //         field: 'idemploye',
        //         message: 'Le champ idemploye est obligatoire. veuillez entrer le id de l\'employe'
        //     }
        // }
        this.idemploye = idemploye;
    }

    setDateheuredebutsuivi(dateheuredebutsuivi) {
        if (dateheuredebutsuivi == null || dateheuredebutsuivi == undefined || dateheuredebutsuivi.trim() == "") {
            this.dateheuredebutsuivi = this.dateheurerendezvous;
        }
        else {
            this.dateheuredebutsuivi = dateheuredebutsuivi;
        }
    }

    setDateheurefinsuivi(dateheurefinsuivi) {
        if (dateheurefinsuivi == null || dateheurefinsuivi == undefined || dateheurefinsuivi.trim() == "") {
            this.dateheurefinsuivi = new Date().date;
        }
        else {
            this.dateheurefinsuivi = dateheurefinsuivi;
        }
    }

    static async getRendezvousValideApresDateEtNonTermine(db, stringTimestamp) {
        let date = new Date(stringTimestamp);
        let rendezvous = new SuiviEmployeRendezvous();
        let query = {
            $and: [
                { dateheurevalidation: { $gte: date.date } },
                { _state: 1 },
                { dateheurefinsuivi: { $eq: null } }
            ]
        };
        return await rendezvous.read(db, query);
    }

    static async getMoyenneHeureTravailParEmployeParDate(db, stringDebutTimestamp, stringFinTimestamp) {
        let debutDate = new Date(stringDebutTimestamp);
        let finDate = new Date(stringFinTimestamp);
        let rendezvous = new SuiviEmployeRendezvous();
        let query = {
            $and: [
                { dateheurerendezvous: { $gte: debutDate.date } },
                { dateheurerendezvous: { $lte: finDate.date } }
            ]
        };
        let suiviemployerendezvous = await rendezvous.read(db, query);
        let employes = [];
        let employesObject = [];
        let moyenneHeureTravailParEmploye = [];
        suiviemployerendezvous.forEach(element => {
            if (employes.indexOf(element.idemploye) == -1) {
                employes.push(element.idemploye);
                employesObject.push(element.employe[0]);
            }
        });
        employes.forEach(employe => {
            let tempsTravail = 0;
            let nombreRendezvous = 0;
            suiviemployerendezvous.forEach(element => {
                if (element.idemploye == employe) {
                    if (element.dateheurefinsuivi && element.dateheuredebutsuivi) {
                        tempsTravail += (moment(element.dateheurefinsuivi).diff(moment(element.dateheuredebutsuivi)) / (1000 * 60 * 60));
                        nombreRendezvous++;
                    }
                }
            });
            moyenneHeureTravailParEmploye.push({
                employe: employesObject[employes.indexOf(employe)],
                moyenneTempsTravail: tempsTravail / nombreRendezvous,
                nombreRendezvous: nombreRendezvous
            });
        });
        return moyenneHeureTravailParEmploye;
    
    }       
}

exports.SuiviEmployeRendezvous = SuiviEmployeRendezvous;