const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { replaceSpecialCharacters } = require("./string.util");
const { Date } = require("../beans/date.bean.util");

function getStorage(destination) {
  const adjustedDestination = path.join('/tmp', destination);
  if (!fs.existsSync(adjustedDestination)) {
    fs.mkdirSync(adjustedDestination, { recursive: true });
  }
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination); 
    },
    filename: function (req, file, cb) {
      cb(null, replaceSpecialCharacters(file.originalname, '_') + '_' + replaceSpecialCharacters(new Date().date, '_') + path.extname(file.originalname));
    },
  });
}

exports.getStorage = getStorage;
