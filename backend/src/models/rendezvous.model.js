const { Date } = require("../beans/date.bean.util");
const { Email } = require("../beans/email.model");
const { TableObject } = require("../beans/tableobject.bean");
const { getNonEmptyObject } = require("../utils/object.util");
const moment = require("moment");
moment.locale('fr');

class Rendezvous extends TableObject {
    constructor(idclient, idservice, dateheurerendezvous) {
        super();
        this.idclient = idclient;
        this.idservice = idservice;
        this.dateheurerendezvous = getNonEmptyObject(dateheurerendezvous);
        this.linkedTableId = [
            {
                tableName: "utilisateur",
                foreignField: "_id",
                localField: "idclient",
                as: "client",
            },
            {
                tableName: "service",
                foreignField: "_id",
                localField: "idservice",
                as: "service",
            },
            {
                tableName: "paiement",
                foreignField: "idrendezvous",   
                localField: "_id",
                as: "paiement",
            }
        ];
    }

    setIdclient(idclient) {
        if (idclient == null || idclient == undefined || idclient.trim() == "") {
            throw {
                field: 'idclient',
                message: 'Le champ idclient est obligatoire. veuillez entrer le id du client'
            }
        }
        this.idclient = idclient;
    }

    setIdservice(idservice) {
        if (idservice == null || idservice == undefined || idservice.trim() == "") {
            throw {
                field: 'idservice',
                message: 'Le champ idservice est obligatoire. veuillez entrer le id du service'
            }
        }
        this.idservice = idservice;
    }

    setDateheurerendezvous(dateheurerendezvous) {
        if (dateheurerendezvous == null || dateheurerendezvous == undefined || dateheurerendezvous.trim() == "") {
            this.dateheurerendezvous = new Date().date;
        }
        else {  
            this.dateheurerendezvous = dateheurerendezvous;
        }
    }

    async read(connection, afterWhereString) {
        this._state = 1;
        return await super.read(connection, afterWhereString);
    }

    async readWithAddFieldAndGroupBy(connection, afterWhereString, afterGroupByString, afterAddFieldsString, state = 1) {
        this._state = state;
        return await super.readWithAddFieldAndGroupBy(connection,afterWhereString,afterGroupByString, afterAddFieldsString);
    }

    async delete (connection, afterWhereString) {
        if (this._id == null || this._id == undefined || this._id.trim() == ""){
            throw new Error("L'id du rendezvous est obligatoire");
        }
        await super.update(connection, {_state: -1}, afterWhereString);
    }

    static async checkAndSendReminders(db, client) {
        const now = moment().format('YYYY-MM-DD HH:mm:ss');
        const rendezvous = new Rendezvous();
        rendezvous.idclient = client._id;
        const appointments = await rendezvous.read(db, { 
            $and: [
                { dateheurerendezvous: { $gte: now } },
                { dateheurevalidation: { $ne: null } }
            ]
        });
        let reminder = [];
        appointments.forEach(appointment => {  
            if (moment(appointment.dateheurerendezvous).diff(moment(), 'minutes') < 5) {
                reminder.push(appointment);
            }            
        });
        return reminder;
    }
    
    static async sendMailReminder(appointment, client) {
        appointment = JSON.parse(appointment);
        client = JSON.parse(client);
        const email = new Email();
        email.receiver = client.email;
        email.setSubject("Rappel de rendez-vous");
        email.setMessage(`
            <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f8f8f8; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto;">
            <p style="font-size: 18px; color: #333; margin-bottom: 15px;">
                Bonjour ${client.prenom} ${client.nom},
            </p>
            <p style="font-size: 16px; color: #555; margin-bottom: 15px;">
                Ceci est un rappel pour votre rendez-vous du <strong style="color: #007bff;">${moment(appointment.dateheurerendezvous).format('dddd D MMMM YYYY')}</strong> à <strong style="color: #007bff;">${moment(appointment.dateheurerendezvous).format('HH')} heure(s) ${moment(appointment.dateheurerendezvous).format('mm') } minute(s) </strong> pour le service <strong style="color: #007bff;">"${appointment?.service[0].nom}"</strong>
            </p>
            ${appointment.service[0].image ? `<img src="${appointment.service[0].image}" alt="Service image" style="max-width: 100%; height: auto; border-radius: 10px; margin-top: 15px;"/>` : ''}
            <p style="font-size: 16px; color: #555; margin-bottom: 15px;">
                Si vous avez des questions, n'hésitez pas à nous contacter.
            </p>
            <p style="font-size: 16px; color: #555; margin-bottom: 15px;">
                Merci et à bientôt!
            </p>
            <a href="${process.env.FRONTEND_URL}" style="font-size: 16px; color: #ffffff; background-color: #007bff; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block; margin-bottom: 15px;">
                Visiter le site
            </a>
            </div>
        `);

        await email.sendMail();
    }
}

exports.Rendezvous = Rendezvous;