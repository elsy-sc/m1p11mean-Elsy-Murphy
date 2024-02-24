function replaceSpecialCharacters(str, replacement) {
  return str.replace(/[^\w\s]/gi, replacement);
}

exports.replaceSpecialCharacters = replaceSpecialCharacters;