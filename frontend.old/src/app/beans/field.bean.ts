export class Field {
    name: string;
    value: string | undefined;
    type: string | undefined;
    
    constructor(name: string, value?: string, type?: string) {
        this.name = name;
        this.value = value || undefined;
        this.type = type || undefined;
    }
}
