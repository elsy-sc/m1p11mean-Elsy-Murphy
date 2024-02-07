export interface Select {
    label?: string;
    name: string;
    placeholder?: string;
    labelValues?: {};
    objectOptions?: {}; // object, label, value // { [key: string]: any }
    rest?: string; // { [key: string]: any }
    multiple: boolean;
    multipleLabelSearch?: string;
}

export function Select(options: Select): PropertyDecorator {
    return function (target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata('Select', options, target, propertyKey);
    }
}

function getLabelHtml(select: Select) {
    if(select.label) {
        return `<div class="labelContainer"><label class="label">${select.label}</label></div>`;
    }
    return '';
}

function getPlaceholderKeyValueString ( select: Select ) {
    if(select.placeholder) {
        return ` placeholder="${select.placeholder}"`;
    }
    return '';
}

function getRestKeyValueString ( select: Select ) {
    if(select.rest) {
        return ` ${select.rest}`;
    }
    return '';
}

function getNameKeyValueString ( select: Select ) {
    if(select.name) {
        return ` name="${select.name}"`;
    }
    return '';
}

function getLabelValuesKeyValueString(select: Select) {
    if (select.labelValues) {
        let result = "[options]=\"[";
        for (let key in select.labelValues) {
            result = result + "{label: '" + (select.labelValues as {[key: string]: string})[key] + "', value: '" + key + "'},";
        }
        result = result + "]\"";
        return result;
    }
    return '';
}

export function getSelectHtml(select: Select) {
    let result = "<div class=\"flex flex-column gap-2 container\">" + getLabelHtml(select) + "<div class=\"inputContainer\"><div class=\"grid formgrid\">"; 

    if (select.multiple == true) {
        if (select.objectOptions) {
            
        }
        else {
            result = result + "<div class=\"inputContainer\"><p-multiSelect" + getPlaceholderKeyValueString(select) + getRestKeyValueString(select) + getNameKeyValueString(select) + getLabelValuesKeyValueString(select) + " class=\"multiselect-custom\" optionLabel=\"value." + select.multipleLabelSearch + "\" display=\"chip\"><ng-template let-x pTemplate=\"item\"><div class=\"flex align-items-center\"><span class=\"ml-2\">{{x.value."+ select.multipleLabelSearch + "}}</span></div></ng-template></p-multiSelect></div>";
        }
        
    } else {
        if (select.objectOptions) {
            
        }
        else {
            result = result + "<div class=\"inputContainer\"><p-dropdown" + getPlaceholderKeyValueString(select) + getRestKeyValueString(select) + getNameKeyValueString(select) + getLabelValuesKeyValueString(select) + " [showClear]=\"true\"></p-dropdown></div>";
        }
    }

    result = result + "</div></div></div>";
    return result;
}
