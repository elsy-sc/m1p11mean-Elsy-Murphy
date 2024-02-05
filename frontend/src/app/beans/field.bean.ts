export class Field {
    name: string | undefined;
    value: string | undefined;
    type: string | undefined;
    
    constructor(name?: string, value?: string, type?: string) {
        this.name = name || undefined;
        this.value = value || undefined;
        this.type = type || undefined;
    }
}
