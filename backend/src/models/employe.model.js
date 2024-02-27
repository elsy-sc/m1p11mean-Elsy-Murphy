const { HoraireTravail } = require("./horairetravail.model");
const { Utilisateur } = require("./utilisateur.model");
const moment = require("moment");

class Employe extends Utilisateur {
  constructor(
    nom,
    prenom,
    email,
    datenaissance,
    numerotelephone,
    motdepasse,
    role,
    cin,
    numerocartebancaire
  ) {
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
  ) {
    let employeResult = [];
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
}

exports.Employe = Employe;
