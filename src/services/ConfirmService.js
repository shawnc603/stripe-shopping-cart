const nodemailer = require('nodemailer');

class ConfirmService {
    constructor() {
      this.sendEmail = this.sendEmail.bind(this);
    }
  
    async sendEmail(email, transId, message) {

        const output = `
        <p>Thank You for your payment</p>
        <h3>Payment Details</h3>
        <ul>  
          <li>Email: ${email}</li>
          <li>TransactionId: ${transId}</li>
        </ul>
        <h3>Message</h3>
        <p>${message}</p>
      `;
    
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: '1eab93cac25598', 
            pass: 'e352a20e1c046c'  
        },
        tls:{
          rejectUnauthorized:false
        }
      });
    
      // setup email data with unicode symbols
      let mailOptions = {
          from: '"Node Mailer" <1a7f3b8146-b8c70f@inbox.mailtrap.io>', // sender address
          to: '1a7f3b8146-b8c70f@inbox.mailtrap.io', // list of receivers
          subject: 'Payment Details', // Subject line
          text: 'Payment Details', // plain text body
          html: output // html body
      };
    
      // send mail with defined transport object
      await transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);   
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          //res.render('contact', {msg:'Email has been sent'});
      });
    }
  
  }
  
  module.exports = ConfirmService;