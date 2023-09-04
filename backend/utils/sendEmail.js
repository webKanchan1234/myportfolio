const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        // host: "smtp.gmail.com",//process.env.SMPT_HOST,
        // port:465,// process.env.SMPT_PORT,
        service: 'gmail',//process.env.SMPT_SERVICE,
        // secure:false,
        auth: {
          user: "kanchankr15153795@gmail.com",//process.env.SMPT_MAIL,
          pass: "quzhxcqfdoxrlagr",//process.env.SMPT_PASSWORD,
        },
      });
    
      const mailOptions = {
        from: "kanchankr15153795@gmail.com",//process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
      };
    
      await transporter.sendMail(mailOptions,function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
};

module.exports = sendEmail;
