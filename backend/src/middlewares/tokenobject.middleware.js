const { TokenObject } = require("../beans/tokenobject.bean.util");
const httpUtil = require("../utils/http.util");

async function testToken(req, res, next) {
    const token = req.header("Authorization");
    if (!token) {
        httpUtil.sendJson(res, null, 401, "No token provided");
    }
    else {
        const tokenObject = new TokenObject(token.split(" ")[1]);
        const result = await tokenObject.verifyToken();
        if (!result) {
            httpUtil.sendJson(res, null, 401, "No token provided");
        } else {
            next();
        }
    }
}

exports.testToken = testToken;