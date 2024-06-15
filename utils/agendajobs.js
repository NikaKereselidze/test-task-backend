const { Agenda } = require("agenda");
const { sendExpireNotice } = require("./notifications");
const moment = require("moment");
const Product = require("../database/models/Product.model");

const mongoDbUrl = process.env.MONGO_URI;

let agenda = new Agenda({
  db: { address: mongoDbUrl, collection: "expireJobs" },
});

agenda.start();
console.log("Expire Agenda connected");
const expire = async (email, name, expiresAt, productId) => {
  try {
    agenda.define("expire", async (job) => {
      console.log("Started expiration");
      const { email, name } = job.attrs.data;
      await sendExpireNotice(email, name);
    });

    agenda.define("changeStatusOnExpire", async (job) => {
      console.log("Started changing status on expiration");
      const { productId } = job.attrs.data;
      await Product.findByIdAndUpdate(productId, { status: "expired" });
    });

    const beforeTwoMonths = moment(expiresAt).subtract(2, "months").format();
    const beforeOneMonths = moment(expiresAt).subtract(1, "months").format();
    const beforeOneWeek = moment(expiresAt).subtract(1, "weeks").format();
    const changeStatusTime = moment(expiresAt).format();

    agenda.schedule(beforeTwoMonths, "expire", {
      email,
      name,
      productId,
    });

    agenda.schedule(beforeOneMonths, "expire", {
      email,
      name,
      productId,
    });

    agenda.schedule(beforeOneWeek, "expire", {
      email,
      name,
      productId,
    });

    agenda.schedule(changeStatusTime, "changeStatusOnExpire", {
      productId,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = { agenda, expire };
