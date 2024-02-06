import { Employe } from "../models/employe.model";
import { getFields } from "../utils/reflect.util";

const employe = new Employe();

const fields = getFields(employe);

for (const field of fields) {
    console.log(field);
}