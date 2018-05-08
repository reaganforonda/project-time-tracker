const nodemailer = require('nodemailer')

const {
    GMAIL_USER,
    PASSWORD
} = process.env


module.exports = {
    sendEmail : (req, res) => {
        const {toEmail, fromEmail, subject, message} = req.body
        const smtpTransport = nodemailer.createTransport({
            service : "Gmail",
            auth : {
                user : GMAIL_USER,
                pass : PASSWORD
            }
        })

        const mailOptions = {
            from : fromEmail,
            to : toEmail,
            subject : subject,
            text : message,
        }

        smtpTransport.sendMail(mailOptions, (error, response) => {
            if(error) {
                console.log(error)
            } else {
                res.status(200).send(response);
            }
        })
    }
}