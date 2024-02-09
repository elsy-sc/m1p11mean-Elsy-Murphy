import 'reflect-metadata';

export interface List {
    title: string;
    type?: 'simple' | 'interval';
}

export function List(options: List): PropertyDecorator {
    return function (target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata('List', options, target, propertyKey);
    }
}

export function getTitleHtml(list: List) {
    return `<th style="min-width: 12rem">${list.title}</th>`;
}

