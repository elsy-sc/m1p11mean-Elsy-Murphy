import { Checkbox, getCheckboxHtml } from "../interfaces/annotations/components/checkbox.annotation.component";
import { getCloseFormHtml, getOpenFormHtml } from "../interfaces/annotations/components/form.annotation.component";
import { LabelInput, getLabelInputHtml } from "../interfaces/annotations/components/labelinput.annotation.component";
import { Radio, getRadioHtml } from "../interfaces/annotations/components/radio.annotation.component";
import { Select, getSelectHtml } from "../interfaces/annotations/components/select.annotation.component";
import { Textarea, getTextareaHtml } from "../interfaces/annotations/components/textarea.annotation.component";
import { getTitleHtml } from "../interfaces/annotations/list.annotation";
import { getFields } from "../utils/reflect.util";

export class HtmlTsObject {

    public getLabelInputsHtml(): string {
        let result = '';
        const fields = getFields(this);
        for (const field of fields) {
            const labelInput: LabelInput = Reflect.getMetadata('LabelInput', this, field.name);
            if(labelInput) {
                result = result + getLabelInputHtml(labelInput) + '\n';
            }
        }
        return result;
    }

    public getTextareasHtml(): string {
        let result = '';
        const fields = getFields(this);
        for (const field of fields) {
            const textarea: Textarea = Reflect.getMetadata('Textarea', this, field.name);
            if(textarea) {
                result = result + getTextareaHtml(textarea) + '\n';
            }
        }
        return result;
    }

    public getCheckboxesHtml(): string {
        let result = '';
        const fields = getFields(this);
        for (const field of fields) {
            const checkbox: Checkbox = Reflect.getMetadata('Checkbox', this, field.name);
            if(checkbox) {
                result = result + getCheckboxHtml(checkbox) + '\n';
            }
        }
        return result;
    }


    public getRadiosHtml(): string {
        let result = '';
        const fields = getFields(this);
        for (const field of fields) {
            const radio: Radio = Reflect.getMetadata('Radio', this, field.name);
            if(radio) {
                result = result + getRadioHtml(radio) + '\n';
            }
        }
        return result;
    }

    public getSelectsHtml(): string {
        let result = '';
        const fields = getFields(this);
        for (const field of fields) {
            const select: Select = Reflect.getMetadata('Select', this, field.name);
            if(select) {
                result = result + getSelectHtml(select) + '\n';
            }
        }
        return result;
    }

    public getElementsHtml(): string {
        return this.getLabelInputsHtml() + this.getTextareasHtml() + this.getCheckboxesHtml() + this.getRadiosHtml() + this.getSelectsHtml();
    }

    public getCreateHtml(): string {
        const form = Reflect.getMetadata('Form', this.constructor);
        if(form) {
            return '<div class="grid"><div class="col-8 md:col-6"><div class="card p-fluid">' + getOpenFormHtml(form) + '<h5>Création de ' + this.constructor.name +  '</h5>' + this.getElementsHtml() + '<button pButton label="Submit"></button>' + getCloseFormHtml() + '</div></div></div>';
        }
        return '';
    }

    public getReadHtml(): string {

        function getSearch(): string {
            return ''; 
        }

        function getList(object: object): string {
            const fields = getFields(object);
            let result = '<ng-template pTemplate="header"><tr>';
            for (const field of fields) {
               const listAnnotation = Reflect.getMetadata('List', object, field.name);
                if(listAnnotation) {
                    result = result + getTitleHtml(listAnnotation) + '\n';
                }
            }
            result = result + '<th>Actions</th>';
            result = result + '</tr></ng-template>';
            result = result + '<ng-template pTemplate="body" let-' + object.constructor.name.toLowerCase() + '>';
            result = result + '<tr>';
            for (const field of fields) {
                const listAnnotation = Reflect.getMetadata('List', object, field.name);
                if(listAnnotation) {
                    result = result + '<td>{{' + object.constructor.name.toLowerCase() + '.' + field.name + '}}</td>';
                }
            }
            result = result + '<td><div class="flex"><button pButton pRipple icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" label="Modifier"></button><button pButton pRipple icon="pi pi-trash" class="p-button-rounded p-button-danger" label="Supprimer"></button></div></td>';
            result = result + '</tr>';
            result = result + '</ng-template>';
            return result;
        }

        return '<div class="grid"><div class="col-12"><div class="card"><h5>Liste de ' + this.constructor.name + '</h5><p-table [value]="' + this.constructor.name.toLowerCase()+'-liste" [paginator]="true" [rows]="10">' + getSearch() + getList(this) + '</p-table></div></div></div>';
    
    }

    public getUpdateHtml(): string {
        return '';
    }

    public getDeleteHtml(): string {
        return '';
    }

}