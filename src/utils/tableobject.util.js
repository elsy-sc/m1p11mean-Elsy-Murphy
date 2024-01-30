function sanitizedObject(object){
    const objectTemp = {...object}
    delete objectTemp.tableName;
    delete objectTemp.sequence;
    return objectTemp;
}

exports.sanitizedObject = sanitizedObject;
