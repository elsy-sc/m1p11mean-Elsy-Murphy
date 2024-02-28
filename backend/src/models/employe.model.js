const { HoraireTravail } = require("./horairetravail.model");
const { SuiviEmployeRendezvous } = require("./suiviemployerendezvous.model");
const { Utilisateur } = require("./utilisateur.model");
const moment = require("moment");

class Employe extends Utilisateur {
  constructor(nom, prenom, email, datenaissance, numerotelephone, motdepasse, role, cin, numerocartebancaire) {
    super(nom, prenom, email, datenaissance, numerotelephone, motdepasse, role);
    this.tableName = "utilisateur";
    this.cin =
      cin != undefined && cin != null && cin.toString().trim() != ""
        ? cin
        : undefined;
    this.numerocartebancaire =
      numerocartebancaire != undefined &&
      numerocartebancaire != null &&
      numerocartebancaire.toString().trim() != ""
        ? numerocartebancaire
        : undefined;
    this.role = 1;
  }

  async setCin(cin) {
    if (cin == null || cin == undefined || cin.trim() == "") {
      throw {
        field: "cin",
        message: "Le champ cin est obligatoire. veuillez entrer votre cin",
      };
    }
    this.cin = cin;
  }

  async setNumeroCarteBancaire(numerocartebancaire) {
    if (
      numerocartebancaire == null ||
      numerocartebancaire == undefined ||
      numerocartebancaire.trim() == ""
    ) {
      throw {
        field: "numerocartebancaire",
        message:
          "Le champ numerocartebancaire est obligatoire. veuillez entrer votre numerocartebancaire",
      };
    }
    this.numerocartebancaire = numerocartebancaire;
  }

  static async getEmployeDisponibleParRapportHorairetravail(
    db,
    stringTimestamp
  ) { // employe disponible
    let date = moment(stringTimestamp).format("HH:mm");
    let day = moment(stringTimestamp).day();
    let horairetravail = new HoraireTravail();
    let query = {
      $and: [
        { jour: day },
        {
          $or: [
            {
              heures: {
                $elemMatch: { debut: { $lte: date }, fin: { $gte: date } },
              },
            },
            {
              heures: {
                $elemMatch: { debut: { $lte: date }, fin: { $gte: date } },
              },
            },
          ],
        },
      ],
    };
    return await horairetravail.read(db, query);
  }

  static async getEmployeServiceHorairetravailDatedebutrendezvousDisponible(db, dateheurerendezvous) {
    let employeServiceHorairetravailDatedebutrendezvousDisponible = [];
    let horaireemployesDisponibleParHoraire = await Employe.getEmployeDisponibleParRapportHorairetravail(db, dateheurerendezvous);
    let rendezVousValideApresDateNonTermine = await SuiviEmployeRendezvous.getRendezvousValideApresDateEtNonTermine(db, dateheurerendezvous);
      for (let i = 0; i < horaireemployesDisponibleParHoraire.length; i++) {
        for (let j = 0; j < rendezVousValideApresDateNonTermine.length; j++) {
          if (horaireemployesDisponibleParHoraire[i].idemploye == rendezVousValideApresDateNonTermine[j].idemploye) {
              const horaireTravail = horaireemployesDisponibleParHoraire[i];
              const service = rendezVousValideApresDateNonTermine[j].service;
              const employe = horaireTravail.Employe;
              const dateheuredebutrendezvous = rendezVousValideApresDateNonTermine[j].dateheurerendezvous;
              employeServiceHorairetravailDatedebutrendezvousDisponible.push({employe, service, horaireTravail, dateheuredebutrendezvous});
          }
        }
      }
      return employeServiceHorairetravailDatedebutrendezvousDisponible;
  }

  static async getNonDisponibiliteEmployeParRapportRendezvous(db, dateheurerendezvous) { // employe non disponible
      let employeServiceHorairetravailDatedebutrendezvousDisponible = await Employe.getEmployeServiceHorairetravailDatedebutrendezvousDisponible(db, dateheurerendezvous);
      let listeEmployeNonDisponible = [];
      for (let i = 0; i < employeServiceHorairetravailDatedebutrendezvousDisponible.length; i++) {
          let dateheuredebutrendezvousService = employeServiceHorairetravailDatedebutrendezvousDisponible[i].dateheuredebutrendezvous;
          let dureeservice = employeServiceHorairetravailDatedebutrendezvousDisponible[i].service[0].duree;
          let dateheurefinrendezvousService = moment(dateheuredebutrendezvousService).add(dureeservice, 'hours').format('YYYY-MM-DD HH:mm:ss');
          if (moment(dateheurerendezvous, 'HH:mm').isBetween(moment(dateheuredebutrendezvousService, 'HH:mm'), moment(dateheurefinrendezvousService, 'HH:mm'))) {
              listeEmployeNonDisponible.push(employeServiceHorairetravailDatedebutrendezvousDisponible[i].employe);
          }
      }
    return listeEmployeNonDisponible;
  }

  static async getEmployeDisponibleParRapportRendezvous(db, dateheurerendezvous) {
    let employeServiceHorairetravailDatedebutrendezvousDisponible = await Employe.getEmployeServiceHorairetravailDatedebutrendezvousDisponible(db, dateheurerendezvous);
    let listeEmployeDisponible = [];
    let listeEmployeNonDisponible = await Employe.getNonDisponibiliteEmployeParRapportRendezvous(db, dateheurerendezvous);
    for (let i = 0; i < employeServiceHorairetravailDatedebutrendezvousDisponible.length; i++) {
      let employe = employeServiceHorairetravailDatedebutrendezvousDisponible[i].employe;
      let trouve = false;
      for (let j = 0; j < listeEmployeNonDisponible.length; j++) {
        if (employe._id == listeEmployeNonDisponible[j]._id) {
          trouve = true;
          break;
        }
      }
      if (!trouve) {
        listeEmployeDisponible.push(employe);
      }
    }
    
    let listeEmployeDisponibleNonRepete = [];
    for (let i = 0; i < listeEmployeDisponible.length; i++) {
      let trouve = false;
      for (let j = 0; j < listeEmployeDisponibleNonRepete.length; j++) {
        if (listeEmployeDisponible[i]._id == listeEmployeDisponibleNonRepete[j]._id) {
          trouve = true;
          break;
        }
      }
      if (!trouve) {
        listeEmployeDisponibleNonRepete.push(listeEmployeDisponible[i]);
      }
    }
    return listeEmployeDisponibleNonRepete;
  }

  static async getEmployeDisponible(db, dateheurerendezvous) {
    let employeResult = [];
    let horaireTravailEmployeDisponible = await Employe.getEmployeDisponibleParRapportHorairetravail(db, dateheurerendezvous);
    let employeNonDisponible = await Employe.
    getNonDisponibiliteEmployeParRapportRendezvous(db, dateheurerendezvous);
    for (let i = 0; i < horaireTravailEmployeDisponible.length; i++) {  
      let trouve = false;
      for (let j = 0; j < employeNonDisponible.length; j++) {
        if (horaireTravailEmployeDisponible[i].Employe._id == employeNonDisponible[j]._id) {
          trouve = true;
          break;
        }
      }
      if (!trouve) {
        employeResult.push(horaireTravailEmployeDisponible[i].Employe);
      }
    }
    console.log(employeResult)
    return employeResult;
  }

}

exports.Employe = Employe;