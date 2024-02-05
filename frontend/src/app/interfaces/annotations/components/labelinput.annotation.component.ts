export interface LabelInput {
    label?: string;
    type?: string;
    name: string;
    value?: string;
    iconLeft?: string;
    iconRight?: string;
    rest?: { [key: string]: any };
}

export function LabelInput(options: LabelInput) {
    return function (target: any, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            value: options,
            enumerable: true,
            configurable: true
        });
    }
}

function getLabelKeyValueString( labelInput: LabelInput ) {
    if(labelInput.label) {
        return `label="${labelInput.label}"`;
    }
    return '';
}

function getTypeKeyValueString( labelInput: LabelInput ) {
    if(labelInput.type) {
        return `type="${labelInput.type}"`;
    }
    return '';
}

function getNameKeyValueString( labelInput: LabelInput ) {
    if(labelInput.name) {
        return `name="${labelInput.name}"`;
    }
    return '';
}

function getValueKeyValueString( labelInput: LabelInput ) {
    if(labelInput.value) {
        return `value="${labelInput.value}"`;
    }
    return '';
}

function getIconLeftKeyValueString( labelInput: LabelInput ) {
    if(labelInput.iconLeft) {
        return `iconLeft="${labelInput.iconLeft}"`;
    }
    return '';
}

function getIconRightKeyValueString( labelInput: LabelInput ) {
    if(labelInput.iconRight) {
        return `iconRight="${labelInput.iconRight}"`;
    }
    return '';
}


function getRestKeyValueString( labelInput: LabelInput ) {
    if(labelInput.rest) {
        return `rest="${labelInput.rest}"`;
    }
    return '';
}

export function getLabelInputHtml(labelInput: LabelInput) {
    return `<LabelInput ${getLabelKeyValueString(labelInput)} ${getTypeKeyValueString(labelInput)} ${getNameKeyValueString(labelInput)} ${getValueKeyValueString(labelInput)} ${getIconLeftKeyValueString(labelInput)} ${getIconRightKeyValueString(labelInput)} ${getRestKeyValueString(labelInput)}/>`;
}

