import { HtmlObject } from "./htmlobject.bean";

export class TableObject extends HtmlObject{
    _id: string|undefined;
    _state: string|undefined;
    
    constructor(id?: string, state?: string) {
        super();
        this._id = id;
        this._state = state;
    }

    
}