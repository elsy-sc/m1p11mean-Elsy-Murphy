const { TableObject } = require("./tableobject.bean");
const nodemailer = require("nodemailer");

class Email extends TableObject {
    constructor(receiver, subject, message, attachments) {
        super();
        this.receiver = receiver
        this.subject = subject
        this.message = message
        this.attachments = attachments
    }

    setMessage(message){
        if (!message || message.trim() == "") {
            throw new Error("Le message est obligatoire");
        }
        this.message = message;
    }

    setSubject(subject){
        if (!subject || subject.trim() == ""){
            throw new Error("Le sujet est obligatoire");
        }
        this.subject = subject;
    }

    getHtmlCodeMessage(message) {
        return `
          <div style="text-align: center; margin-bottom: 20px;">
            <p style="font-size: 18px; color: #333;">Votre code à usage unique est: </p>
            <h2 style="font-size: 24px; font-weight: bold; margin: 0;">${message}</h2>
          </div>
        `;
    }

    setCode(code){
        this.setSubject("Votre code à usage unique");
        this.setMessage(this.getHtmlCodeMessage(code));
    }

    getTransporter(){
        return nodemailer.createTransport({
           service: process.env.EMAIL_SERVICE,
              auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
              },
        });
    }

    getMailOptions(){
        return {
            from: process.env.EMAIL_USERNAME,
            to: this.receiver,
            subject: this.subject,
            html: this.message,
            attachments: this.attachments
        }
    }

    async sendMail(){
        await this.getTransporter().sendMail(this.getMailOptions());
    }
}

exports.Email = Email;