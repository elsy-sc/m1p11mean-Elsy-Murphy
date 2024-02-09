export interface Radio {
    label?: string;
    name: string;
    labelValues?: {};
    objectOptions?: {}; // object, label, value // { [key: string]: any }
    rest?: string; // { [key: string]: any }
    ngModel: string;
}

export function Radio(options: Radio): PropertyDecorator {
    return function (target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata('Radio', options, target, propertyKey);
    }
}

function getLabelHtml(radio: Radio) {
    if(radio.label) {
        return `<div class="labelContainer"><label class="label">${radio.label}</label></div>`;
    }
    return '';
}

function getRestKeyValueString ( radio: Radio ) {
    if(radio.rest) {
        return ` ${radio.rest}`;
    }
    return '';
}

export function getRadioHtml(radio: Radio) {
    let result = "<div class=\"flex flex-column gap-2 container\">" + getLabelHtml(radio) + "<div class=\"inputContainer\"><div class=\"grid formgrid\">"; 

    if (radio.objectOptions) {
        
    }
    else {
        for (let key in radio.labelValues) {
            result = result + `<div class="p-field-radiobutton col-12 md:col-4"><p-radioButton [(ngModel)]="${radio.ngModel}" name="${radio.name}" ${getRestKeyValueString(radio)}value="${key}" label="${(radio.labelValues as {[key: string]: string})[key]}"></p-radioButton></div>`;
        }
    }
    result = result + "</div></div></div>";
    return result;
}
