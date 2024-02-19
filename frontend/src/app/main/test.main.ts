import { Employe } from "../models/employe.model";
import { PAGE_PATH } from "../utils/constante.util";
import { writeToFile } from "../utils/file.util";

const employe = new Employe();

writeToFile(process.cwd() + PAGE_PATH + 'employe/employe.html', employe.getElementsHtml());
writeToFile(process.cwd() + PAGE_PATH + 'employe/CreateEmploye.ts', employe.getTsCreate());
writeToFile(process.cwd() + PAGE_PATH + 'employe/ReadEmploye.ts', employe.getTsRead());