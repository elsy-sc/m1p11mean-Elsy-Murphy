import 'reflect-metadata';

export interface LabelInput {
    label?: string;
    type?: string;
    name: string;
    value?: string;
    iconLeft?: string;
    iconRight?: string;
    rest?: { [key: string]: any };
}

export function LabelInput(options: LabelInput): PropertyDecorator {
    return function (target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata('LabelInput', options, target, propertyKey);
    }
}

function getLabelKeyValueString( labelInput: LabelInput ) {
    if(labelInput.label) {
        return ` label="${labelInput.label}"`;
    }
    return '';
}

function getTypeKeyValueString( labelInput: LabelInput ) {
    if(labelInput.type) {
        return ` type="${labelInput.type}"`;
    }
    return '';
}

function getNameKeyValueString( labelInput: LabelInput ) {
    if(labelInput.name) {
        return ` name="${labelInput.name}"`;
    }
    return '';
}

function getValueKeyValueString( labelInput: LabelInput ) {
    if(labelInput.value) {
        return ` value="${labelInput.value}"`;
    }
    return '';
}

function getIconLeftKeyValueString( labelInput: LabelInput ) {
    if(labelInput.iconLeft) {
        return ` iconLeft="${labelInput.iconLeft}"`;
    }
    return '';
}

function getIconRightKeyValueString( labelInput: LabelInput ) {
    if(labelInput.iconRight) {
        return ` iconRight="${labelInput.iconRight}"`;
    }
    return '';
}

function getRestKeyValueString( labelInput: LabelInput ) {
    if(labelInput.rest) {
        return ` rest="${labelInput.rest}"`;
    }
    return '';
}

export function getLabelInputHtml(labelInput: LabelInput) {
    let result = "<LabelInput";
    result = result + getLabelKeyValueString(labelInput);
    result = result + getTypeKeyValueString(labelInput);
    result = result + getNameKeyValueString(labelInput);
    result = result + getValueKeyValueString(labelInput);
    result = result + getIconLeftKeyValueString(labelInput);
    result = result + getIconRightKeyValueString(labelInput);
    result = result + getRestKeyValueString(labelInput);
    result = result + "/>";
    return result;
}

