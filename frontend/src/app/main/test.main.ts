import { Employe } from "../models/employe.model";
import { PAGE_PATH } from "../utils/constante.util";
import { writeToFile } from "../utils/file.util";

const employe = new Employe();

console.log(employe.getLabelInputsHtml());

writeToFile( process.cwd() + PAGE_PATH + 'employe/employe.html', employe.getLabelInputsHtml());