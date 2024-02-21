import { Employe } from "../models/employe.model";
import { Utilisateur } from "../models/utilisateur.model";
import { PAGE_PATH } from "../utils/constante.util";
import { writeToFile } from "../utils/file.util";

const employe = new Utilisateur();

// writeToFile(process.cwd() + PAGE_PATH + 'employe/employe.html', employe.getElementsHtml());
// writeToFile(process.cwd() + PAGE_PATH + 'employe/CreateEmploye.ts', employe.getTsCreate());
// writeToFile(process.cwd() + PAGE_PATH + 'employe/ReadEmploye.html', employe.getReadHtml());

writeToFile(process.cwd() + PAGE_PATH + 'employe/CreateEmploye.ts', employe.getTsCreate());