const jwt = require("jsonwebtoken");
const { TableObject } = require("./tableobject.bean");
const { Date } = require("./date.bean.util");

class Token extends TableObject {
    constructor(tokenValue, tokenExpirationDateString) { 
        super();
        this.tokenValue = tokenValue;
        this.tokenCreationDate = undefined;
        this.tokenExpirationDate = tokenExpirationDateString;
    }

    setToken() {
        let secret = process.env.SECRET_TOKEN_KEY|| "secret";
        this.tokenCreationDate = new Date().date;
        if (!this.tokenExpirationDate) {
            this.tokenValue = jwt.sign({
                data: this.getSanitizedObject()
            }, secret);
        } else {
            this.tokenValue = jwt.sign({
                exp: new Date(this.tokenExpirationDate).toSeconds(),
                data: this.getSanitizedObject()
            }, secret);
        }
    }

    async verifyToken(db) {
        if (db) {
            if (!this.tokenValue) {
                let data = await this.read(db);
                if (data) {
                    data = data[0];
                }
                this.tokenValue = data.tokenValue;
                this.tokenExpirationDate = data.tokenExpirationDate;
            } 
        }
        try {
            jwt.verify(this.tokenValue, process.env.SECRET_TOKEN_KEY|| "secret");
            return true;
        } catch (error) {
            return false;
        }
    }

    async refreshToken(db) {
        this.setToken();
        if (db) {
            const { tokenValue, tokenExpirationDate } = this;
            this.tokenValue = undefined;
            this.tokenExpirationDate = undefined;
            await this.update(db , { tokenValue: tokenValue, tokenExpirationDate: tokenExpirationDate });
            this.tokenValue = tokenValue;
            this.tokenExpirationDate = tokenExpirationDate;
        }
    }

    async create(db) {
        if (!this.tokenValue) {
            this.setToken();
        }
        await super.create(db);
    }    
}

exports.TokenObject = Token;