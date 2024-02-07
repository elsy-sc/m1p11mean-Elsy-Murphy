import { Checkbox, getCheckboxHtml } from "../interfaces/annotations/components/checkbox.annotation.component";
import { LabelInput, getLabelInputHtml } from "../interfaces/annotations/components/labelinput.annotation.component";
import { Radio, getRadioHtml } from "../interfaces/annotations/components/radio.annotation.component";
import { Select, getSelectHtml } from "../interfaces/annotations/components/select.annotation.component";
import { Textarea, getTextareaHtml } from "../interfaces/annotations/components/textarea.annotation.component";
import { getFields } from "../utils/reflect.util";

export class HtmlObject {
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

}