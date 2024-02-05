import { LabelInput } from "../interfaces/annotations/components/labelinput.annotation.component";

export class Personne {
    
    @LabelInput({ name: 'nom' })
    nom: string;
    prenom: string;
    age: number;
    email: string;
    
    constructor(nom: string, prenom: string, age: number, email: string) {
        this.nom = nom;
        this.prenom = prenom;
        this.age = age;
        this.email = email;
    }
}

