import { Field } from "../beans/field.bean";
import { addObjectToObjectArray } from "./array.util";

export function getField(object: any, fieldName: string): Field | null {
    const propertyDescriptor = Object.getOwnPropertyDescriptor(
      object,
      fieldName
    );
    if (propertyDescriptor) {
      return new Field(fieldName, object[fieldName], typeof object[fieldName]);
    }
    return null;
}

export function getFields(object: any): Field[] {
    const propertyDescriptors = Object.getOwnPropertyDescriptors(object);
    const fieldNames = Object.keys(propertyDescriptors);
    let fields: Field[] = [];
    for (const fieldName of fieldNames) {
        let value = propertyDescriptors[fieldName].value;
        fields = addObjectToObjectArray(
          fields,
          new Field(fieldName, value, typeof value)
        );
    }
    return fields;
}
