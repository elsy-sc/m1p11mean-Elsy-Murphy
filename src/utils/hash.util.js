const bcrypt = require('bcrypt');

function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT_ROUNDS|| "10")));
}

function checkPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}

exports.hashPassword = hashPassword;
exports.checkPassword = checkPassword;