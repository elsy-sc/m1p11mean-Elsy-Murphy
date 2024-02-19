export interface Checkbox {
    label?: string;
    name: string;
    labelValues?: {};
    objectOptions?: {}; // object, label, value // { [key: string]: any }
    rest?: string; // { [key: string]: any }
    ngModel?: string;
}

export function Checkbox(options: Checkbox): PropertyDecorator {
    return function (target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata('Checkbox', options, target, propertyKey);
    }
}

function getLabelHtml(checkbox: Checkbox) {
    if(checkbox.label) {
        return `<div class="labelContainer"><label class="label">${checkbox.label}</label></div>`;
    }
    return '';
}

function getRestKeyValueString ( checkbox: Checkbox ) {
    if(checkbox.rest) {
        return ` ${checkbox.rest}`;
    }
    return '';
}

function getNgModelKeyValueString(checkbox: Checkbox) {
    if (checkbox.ngModel) {
        return ` [(ngModel)]="${checkbox.ngModel}"`;
    }
    return '';
}

export function getCheckboxHtml(checkbox: Checkbox) {
    let result = "<div class=\"flex flex-column gap-2 container\">" + getLabelHtml(checkbox) + "<div class=\"inputContainer\"><div class=\"grid formgrid\">"; 

    if (checkbox.objectOptions) {
        
    }
    else {
        for (let key in checkbox.labelValues) {
            result = result + `<div class="p-field-checkbox col-12 md:col-4"><p-checkbox${getNgModelKeyValueString(checkbox)} name="${checkbox.name}" ${getRestKeyValueString(checkbox)}value="${key}" label="${(checkbox.labelValues as {[key: string]: string})[key]}"></p-checkbox></div>`;
        }
    }
    result = result + "</div></div></div>";
    return result;
}
