import 'reflect-metadata';
import { Employe } from "../models/employe.model";

const employe = new Employe();

console.log(employe.getLabelInputsHtml());