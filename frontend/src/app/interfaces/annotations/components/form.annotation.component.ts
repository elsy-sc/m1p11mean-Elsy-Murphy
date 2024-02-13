export interface Form {
    ngSubmit: string;
    rest?: string; 
}

export function Form(options: Form): ClassDecorator {
    return function(target: any) {
        Reflect.defineMetadata('Form', options, target);
    };
}


function getNgSubmitKeyValueString(form: Form) {
    if(form.ngSubmit) {
        return ` (ngSubmit)="${form.ngSubmit}"`;
    }
    return '';
}

function getRestKeyValueString ( form: Form ) {
    if(form.rest) {
        return ` ${form.rest}`;
    }
    return '';
}

export function getOpenFormHtml(form: Form) {
    if(form) {
        return `<form${getNgSubmitKeyValueString(form)}${getRestKeyValueString(form)}>`;
    }
    return '';
}

export function getCloseFormHtml() {
    return `</form>`;
}