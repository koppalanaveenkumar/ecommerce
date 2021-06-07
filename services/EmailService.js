const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
dotenv.config();

console.log("sender email, " + process.env.SENDER_EMAIL);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
let from = process.env.SENDER_EMAIL;
exports.sendEmail = (options)=>{
    let opt = {
        to : options.to, 
        from: from,
        subject: options.subject,
        html: options.html
    };
    //ES6
    sgMail
    .send(opt).then(
        response => {
            console.log(response);
        },
        error => {
            console.log(error);
        }
        )
}