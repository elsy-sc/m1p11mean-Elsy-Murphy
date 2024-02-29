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
        let moyenneHeureTravailParEmploye = [];
        suiviemployerendezvous.forEach(element => {
            console.log(element.employe);
            if (employes.indexOf(element.idemploye) == -1) {
                employes.push(element.idemploye);
            }
        });
        employes.forEach(employe => {
            let tempsTravail = 0;
            let nombreRendezvous = 0;
            suiviemployerendezvous.forEach(element => {
                if (element.idemploye == employe) {
                    if (element.dateheurefinsuivi && element.dateheuredebutsuivi) {
                        /// difference date with moment js
                        tempsTravail +=  moment(element.dateheurefinsuivi).diff(moment(element.dateheuredebutsuivi), 'hours');

                        // tempsTravail += element.dateheurefinsuivi - element.dateheuredebutsuivi;
                        nombreRendezvous++;
                    }
                }
            });
            moyenneHeureTravailParEmploye.push({
                idemploye: employe,
                tempsTravail: tempsTravail / nombreRendezvous
            });
        });
        return moyenneHeureTravailParEmploye;
    
    }       
}

exports.SuiviEmployeRendezvous = SuiviEmployeRendezvous;