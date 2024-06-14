const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "nikakereselidze17@gmail.com",
    pass: process.env.APP_PASSWORD,
  },
});

exports.sendEmail = async ({ email, subject, text }) => {
  const msg = {
    to: email,
    from: {
      address: "nikakereselidze17@gmail.com",
      name: "Nika Test",
    },
    subject,
    html: text,
  };

  try {
    transporter.sendMail(msg);
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log(error.response.body);
    }
  }
};
