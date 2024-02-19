export function addObjectToObjectArray(objects: any[]|null, ...object: any[]): any[] {        
    if (!objects) objects = [];
    return [...objects, ...object];
}
