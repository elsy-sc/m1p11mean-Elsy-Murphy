function filterNullColumn(object) {
  if (object) return Object.fromEntries(Object.entries(object).filter(([key, value]) => value != null));
  return {};
}

function combineObject(...objects) {
  return Object.assign(...objects);
}

function getNonEmptyObject(object) {
  return (object!= undefined && object != null && object.toString().trim() != "") ? object : undefined;
}

exports.combineObject = combineObject;
exports.filterNullColumn = filterNullColumn;
exports.getNonEmptyObject = getNonEmptyObject;