const moment = require("moment");

class DateClass {
    constructor(date) {
        const format = process.env.DATE_FORMAT || "YYYY-MM-DD HH:mm:ss";
        if (!date) {
            this.date = moment(new Date()).format(format);
        } else {
            this.date = moment(date).format(format);
        }
    }   

    toSeconds(){
        return moment(this.date).unix();
    }

    static toSeconds(momentDate) {
        return moment(momentDate).unix();
    }

}

exports.Date = DateClass;
