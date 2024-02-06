import moment from 'moment';
import { Constante } from '../utils/constante.util';

class DateClass {
    date: string;

    constructor(date?: string | Date) {
        const format = Constante.hasOwnProperty('DATE_FORMAT') ? Constante.DATE_FORMAT : "YYYY-MM-DD HH:mm:ss";
        if (!date) {
            this.date = moment().format(format);
        } else {
            this.date = moment(date).format(format);
        }
    }

    toSeconds(): number {
        return moment(this.date).unix();
    }

    static toSeconds(momentDate: string | Date): number {
        return moment(momentDate).unix();
    }
}

export { DateClass as Date };
