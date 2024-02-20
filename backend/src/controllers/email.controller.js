const { Email } = require("../beans/email.model");
const httpUtil = require("../utils/http.util");
const { randomInt } = require("../utils/random.util");

async function sendMail (req, res) {
    try {
        const code = randomInt(111111,999999);
        const email = new Email(req.body?.receiver);
        email.setCode(code);
        await email.sendMail().then((info) => {
            httpUtil.sendJson(res, email.getSanitizedObject(), 201, "OK");
        });
    } catch (error) {
        httpUtil.sendJson(res, null, 400, error.message);
    }
}

exports.sendMail = sendMail;