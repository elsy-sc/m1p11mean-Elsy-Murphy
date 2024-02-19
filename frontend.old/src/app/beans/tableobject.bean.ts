import { HtmlTsObject } from "./htmltsobject.bean";

export class TableObject extends HtmlTsObject{
    _id: string|undefined;
    _state: string|undefined;
    
    constructor(id?: string, state?: string) {
        super();
        this._id = id;
        this._state = state;
    }

    
}