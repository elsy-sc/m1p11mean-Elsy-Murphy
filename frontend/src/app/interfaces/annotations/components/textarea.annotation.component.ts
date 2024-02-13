import 'reflect-metadata';

export interface Textarea {
    label?: string;
    name: string;
    value?: string;
    placeholder?: string;
    rest?: string; // { [key: string]: any }
}

export function Textarea(options: Textarea): PropertyDecorator {
    return function (target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata('Textarea', options, target, propertyKey);
    }
}

function getNameKeyValueString ( textarea: Textarea ) {
    if(textarea.name) {
        return ` name="${textarea.name}"`;
    }
    return '';
}

function getPlaceholderKeyValueString ( textarea: Textarea ) {
    if(textarea.placeholder) {
        return ` placeholder="${textarea.placeholder}"`;
    }
    return '';
}

function getRestKeyValueString ( textarea: Textarea ) {
    if(textarea.rest) {
        return ` ${textarea.rest}`;
    }
    return '';
}

function getLabelHtml(textarea: Textarea) {
    if(textarea.label) {
        return `<div class="labelContainer"><label for="textarea" class="label">${textarea.label}</label></div>`;
    }
    return '';
}

export function getTextareaHtml(textarea: Textarea) {
    let result = "<div class=\"flex flex-column gap-2 container\">" + getLabelHtml(textarea) + "<div class=\"inputContainer\"><span class=\"p-input-icon-left p-input-icon-right\">" + "<textarea id=textarea rows=\"5\" cols=\"30\" pInputTextarea " + getNameKeyValueString(textarea) + getPlaceholderKeyValueString(textarea) + getRestKeyValueString(textarea) + ">" + (textarea.value || "") + "</textarea></span></div></div>";
    return result;
}


