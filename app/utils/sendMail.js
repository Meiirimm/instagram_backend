const nodemailer = require('nodemailer');

// Создание объекта транспорта для отправки email через Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mukhtarmeirim30@gmail.com', // Ваш адрес электронной почты Gmail
    pass: 'cztxnsxzzewulgjq' // Ваш пароль от почты Gmail
  }
});

// Определение маршрута для отправки email
function sendEmail(to, subject, html) {
    const mailOptions = {
        from: 'mukhtarmeirim30@gmail.com',
        to: to,
        subject: subject,
        html: html
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if(error) {
            console.log(error);
        } else{
            console.log('Email sent: ' + info.response);
        }
    })
}

module.exports = sendEmail;