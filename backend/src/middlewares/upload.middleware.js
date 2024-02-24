const multer = require('multer');
const { getStorage } = require("../utils/upload.middleware.util");
const storage = getStorage(process.env.IMAGE_SERVICE_DIRECTORY|| 'public/images/services', 'image');
const uploadFunction = multer({ storage: storage });
const httpUtil = require("../utils/http.util");

async function upload(req, res, next) {
    uploadFunction.single('image')(req, res, function (err) {
        if (err) {
            httpUtil.sendJson(res, null, 500, "Erreur lors de l'upload de l'image.");
        }
        req.body.imageDB = process.env.IMAGE_SERVICE_DIRECTORY + '/' + req.file.filename;
        next();
    });
}

exports.upload = upload;