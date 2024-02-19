import { TableObject } from "./tableobject.bean";

export class TokenObject extends TableObject{
    tokenValue: string|undefined;
    tokenCreationDate : Date|undefined;
    tokenExpirationDate!: Date|undefined;
    
    constructor(tokenValue?: string,tokenCreationDate?: Date,tokenExpirationDate?: Date) {
        super();
        this.tokenValue = tokenValue;
        this.tokenCreationDate = tokenCreationDate;
        this.tokenExpirationDate = tokenExpirationDate;
    }

    
}