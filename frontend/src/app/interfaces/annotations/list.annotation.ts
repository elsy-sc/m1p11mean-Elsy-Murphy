import 'reflect-metadata';

export interface List {
    title: string;
    type?: 'simple' | 'interval';
}

export function List(options: List): ClassDecorator {
    return function (target: any) {
        Reflect.defineMetadata('List', options, target);
    }
}
