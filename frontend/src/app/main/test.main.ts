import { CategorieService } from "../models/categorieservice.model";
import { Depense } from "../models/depense.model";
import { Rendezvous } from "../models/rendezvous.model";
import { HorraireTravail } from "../models/horrairetravail.model";
import { Service } from "../models/service.model";
import { SuiviEmployeRendezVous } from "../models/suiviemployerendezvous.model";
import { TypeDepense } from "../models/typedepense.model";
import { Paiement } from "../models/paiement.model";

// const depense = new Depense();
// depense.generateCRUD();

// const rendezvous = new SuiviEmployeRendezVous();
// rendezvous.generateCreate();
// const paiement = new Paiement() ;
// paiement.generateCRUD();

const paiement = new Paiement();
paiement.setTsService();
