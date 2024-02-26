const multer = require('multer');
const uploadFunction = multer({ storage: multer.memoryStorage() });

async function upload(req, res, next) {
    uploadFunction.single('image')(req, res, function (err) {
        if (err) {
            httpUtil.sendJson(res, null, 500, "Erreur lors de l'upload de l'image.");
        }
        if (req.file) {
            const base64Image = req.file.buffer.toString('base64');
            const mimeType = req.file.mimetype;
            const fullBase64Image = `data:${mimeType};base64,${base64Image}`;
            req.body.imageDB = fullBase64Image;
        }
        next();
    });
}

exports.upload = upload;