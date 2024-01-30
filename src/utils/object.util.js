function filterNullColumn(object) {
  if (object) return Object.fromEntries(Object.entries(object).filter(([key, value]) => value != null));
  return {};
}

function combineObject(...objects) {
  return Object.assign(...objects);
}

exports.combineObject = combineObject;
exports.filterNullColumn = filterNullColumn;
