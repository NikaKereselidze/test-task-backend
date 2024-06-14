const { sendEmail } = require("./email");

exports.sendExpireNotice = async (email, name) => {
  await sendEmail({
    email,
    subject: `${name} is going to expire soon`,
    text: `${name} is going to expire soon.. please renew your product`,
  });
};
