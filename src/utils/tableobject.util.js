function sanitizedObject(object){
    const objectTemp = {...object}
    delete objectTemp.tableName;
    delete objectTemp.sequence;
    delete objectTemp.linkedTableId;
    return objectTemp;
}

exports.sanitizedObject = sanitizedObject;
