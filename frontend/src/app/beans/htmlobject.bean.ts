import { LabelInput, getLabelInputHtml } from "../interfaces/annotations/components/labelinput.annotation.component";
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
}